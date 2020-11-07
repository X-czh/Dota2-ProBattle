import simplejson as json

from flask import Flask, request
from flask_cors import CORS

import pymysql.cursors
from pymysql import MySQLError

from data_manager import DataManager


# Configure Flask
app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app, support_credentials=True)


# Configure MySQL
conn = pymysql.connect(host='localhost',
                       user='root',
                       password='Dota2ProBattlePWD',
                       db='dota2probattle',
                       charset='utf8mb4',
                       cursorclass=pymysql.cursors.DictCursor)


# Configure Data Manager
data_manager = DataManager(conn)


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/addMatchByMatchID', methods=['POST'])
def add_match_by_match_id():
    try:
        form = request.get_json()['params']
        match_id = form['id']
        data_manager.insert_match_with_player_stats(match_id)
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except ValueError as ve:
        msg = "Got error {!r}, errno is {}".format(ve, ve.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)
    return msg


@app.route('/addMatchByAccountID', methods=['POST'])
def add_match_by_account_id():
    try:
        form = request.get_json()['params']
        account_id = form['id']
        data_manager.insert_player_with_recent_matches(account_id)
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except ValueError as ve:
        msg = "Got error {!r}, errno is {}".format(ve, ve.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)
    return msg


@app.route('/updateMatch', methods=['POST'])
def update_match():
    try:
        form = request.get_json()['match']
        match_id = form['match_id']
        start_time = form['start_time']
        with conn.cursor() as cursor:
            stmt = 'UPDATE Matches SET start_time = UNIX_TIMESTAMP(%s) WHERE match_id = %s'
            cursor.execute(stmt, (start_time, match_id))
        conn.commit()
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)
    return msg


@app.route('/deleteMatch', methods=['POST'])
def delete_match():
    try:
        form = request.get_json()['match']
        match_id = form['id']
        with conn.cursor() as cursor:
            # query if such match exists
            stmt = 'SELECT match_id FROM Matches WHERE match_id = %s'
            cursor.execute(stmt, (match_id))
            data = cursor.fetchone()
            if data is None:
                msg = "No match found!"
                print(msg)
                return msg

            # delete match
            stmt = 'DELETE FROM Matches WHERE match_id = %s'
            cursor.execute(stmt, (match_id))
        conn.commit()
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)
    return msg


@app.route('/searchMatchByMatchID', methods=['POST'])
def search_match_by_match_id():
    try:
        form = request.get_json()['params']
        match_id = form['id']
        with conn.cursor() as cursor:
            stmt = (
                'SELECT match_id, FROM_UNIXTIME(start_time) AS start_time\n'
                'FROM Matches\n'
                'WHERE match_id = %s'
            )
            cursor.execute(stmt, (match_id))
            data = cursor.fetchall()
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)
    
    if data is None:
        data = []
    # only show the date; convert to string
    for e in data:
        e['start_time'] = e['start_time'].strftime("%m/%d/%Y")
    return json.dumps(data)


@app.route('/searchMatchByAccountID', methods=['POST'])
def search_match_account_id():
    try:
        form = request.get_json()['params']
        account_id = form['id']
        with conn.cursor() as cursor:
            stmt = (
                'SELECT match_id, FROM_UNIXTIME(start_time) AS start_time\n'
                'FROM Matches NATURAL JOIN Plays_in\n'
                'WHERE account_id = %s'
            )
            cursor.execute(stmt, (account_id))
            data = cursor.fetchall()
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)

    if data is None:
        data = []
    # only show the date; convert to string
    for e in data:
        e['start_time'] = e['start_time'].strftime("%m/%d/%Y")
    return json.dumps(data)


@app.route('/debuffOpponentHero', methods=['POST'])
def debuff_opponent_hero():
    try:
        account_id = request.get_json()['idInput']
        with conn.cursor() as cursor:
            stmt = (
                'SELECT hero_name, COUNT(*) AS num_games, ROUND(SUM(result) / COUNT(*), 2) AS win_rate\n'
                'FROM Plays_in NATURAL JOIN Hero\n'
                'WHERE account_id = %s\n'
                'GROUP BY hero_id\n'
                'ORDER BY num_games DESC, win_rate DESC\n'
                'LIMIT 10'
            )
            cursor.execute(stmt, (account_id))
            data = cursor.fetchall()
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)
    
    if data is None:
        data = []
    return json.dumps(data)


@app.route('/debuffOpponentItem', methods=['POST'])
def debuff_opponent_item():
    try:
        # parse form
        form = request.get_json()['heros']
        my_hero = form['myhero']
        opponent_heroes = [form[f'opponenthero{i+1}'] for i in range(5)]

        # query
        with conn.cursor() as cursor:
            stmt = (
                'SELECT hero_name, COUNT(*) AS num_games, ROUND(SUM(result) / COUNT(*), 2) AS win_rate\n'
                'FROM Plays_in NATURAL JOIN Hero\n'
                'WHERE account_id = %s\n'
                'GROUP BY hero_id\n'
                'ORDER BY num_games DESC, win_rate DESC\n'
                'LIMIT 10'
            )
            cursor.execute(stmt, (my_hero))
            data = cursor.fetchall()
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    finally:
        msg = "Success"
    print(msg)
    
    if data is None:
        data = []
    return json.dumps(data)


if __name__ == "__main__":
    app.run()
