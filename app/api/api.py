import pymysql.cursors
import simplejson as json
from dotenv import find_dotenv, load_dotenv
from flask import Flask, request
from flask_cors import CORS
from neo4j import GraphDatabase, basic_auth
from neo4j.exceptions import Neo4jError
from pymysql import MySQLError

from data_manager import DataManager
from ml_prediction.model import Model
from util import env

# Load environment variables
load_dotenv(find_dotenv())
MYSQL_HOST = env('MYSQL_HOST')
MYSQL_USER = env('MYSQL_USER')
MYSQL_PWD = env('MYSQL_PWD')
MYSQL_DB = env('MYSQL_DB')
NEO4J_HOST = env('NEO4J_HOST')
NEO4J_USER = env('NEO4J_USER')
NEO4J_PWD = env('NEO4J_PWD')

# Configure Flask
app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app, support_credentials=True)

# Configure MySQL
conn = pymysql.connect(host=MYSQL_HOST,
                       user=MYSQL_USER,
                       password=MYSQL_PWD,
                       db=MYSQL_DB,
                       charset='utf8mb4',
                       cursorclass=pymysql.cursors.DictCursor)

# Configure Neo4j
driver = GraphDatabase.driver(NEO4J_HOST, auth=basic_auth(NEO4J_USER, NEO4J_PWD))
session = driver.session()

# Configure Data Manager
data_manager = DataManager(conn, session)

# Configure ML model for win rate prediction
model = Model("ml_prediction")


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/addMatchByMatchID', methods=['POST'])
def add_match_by_match_id():
    try:
        print(request.get_json())
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
    else:
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
    else:
        msg = "Success"
    print(msg)
    return msg


@app.route('/updateMatch', methods=['POST'])
def update_match():
    try:
        form = request.get_json()['params']
        match_id = form['MatchID']
        start_time = form['startTime']
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
    else:
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
    else:
        msg = "Success"
    print(msg)
    return msg


@app.route('/searchMatchByMatchID', methods=['POST'])
def search_match_by_match_id():
    data = []
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
    else:
        msg = "Success"
    print(msg)
    # only show the date; convert to string
    for e in data:
        e['start_time'] = e['start_time'].strftime("%m/%d/%Y")
    return json.dumps(data)


@app.route('/searchMatchByAccountID', methods=['POST'])
def search_match_account_id():
    data = []
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
    else:
        msg = "Success"
    print(msg)
    # only show the date; convert to string
    for e in data:
        e['start_time'] = e['start_time'].strftime("%m/%d/%Y")
    return json.dumps(data)


@app.route('/debuffOpponentHero', methods=['POST'])
def debuff_opponent_hero():
    data = []
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
    else:
        msg = "Success"
    print(msg)
    if len(data) == 0:
        data = [0]
    return json.dumps(data)


@app.route('/debuffOpponentItem', methods=['POST'])
def debuff_opponent_item():
    data = []
    try:
        # parse form
        form = request.get_json()['heros']
        my_hero = form['myhero']
        opponent_heroes = [form[f'opponenthero{i+1}'] for i in range(5)]

        # query
        with conn.cursor() as cursor:
            stmt = (
                'SELECT item_name, SUM(win_rate) AS aggregated_win_rate\n'
                'FROM(\n'
                    'SELECT hero, item_id, opponent, ROUND(SUM(result) / COUNT(*), 2) AS win_rate\n'
                    'FROM(\n'
                        '(SELECT T1.hero_id AS hero, T1.item_0 AS item_id, T2.hero_id AS opponent, T1.result AS result\n'
                        'FROM Plays_in AS T1, Plays_in AS T2\n'
                        'WHERE T1.match_id = T2.match_id AND T1.hero_id <> T2.hero_id)\n'
                        'UNION\n'
                        '(SELECT T1.hero_id AS hero, T1.item_1 AS item_id, T2.hero_id AS opponent, T1.result AS result\n'
                        'FROM Plays_in AS T1, Plays_in AS T2\n'
                        'WHERE T1.match_id = T2.match_id AND T1.hero_id <> T2.hero_id)\n'
                        'UNION\n'
                        '(SELECT T1.hero_id AS hero, T1.item_2 AS item_id, T2.hero_id AS opponent, T1.result AS result\n'
                        'FROM Plays_in AS T1, Plays_in AS T2\n'
                        'WHERE T1.match_id = T2.match_id AND T1.hero_id <> T2.hero_id)\n'
                        'UNION\n'
                        '(SELECT T1.hero_id AS hero, T1.item_3 AS item_id, T2.hero_id AS opponent, T1.result AS result\n'
                        'FROM Plays_in AS T1, Plays_in AS T2\n'
                        'WHERE T1.match_id = T2.match_id AND T1.hero_id <> T2.hero_id)\n'
                        'UNION\n'
                        '(SELECT T1.hero_id AS hero, T1.item_4 AS item_id, T2.hero_id AS opponent, T1.result AS result\n'
                        'FROM Plays_in AS T1, Plays_in AS T2\n'
                        'WHERE T1.match_id = T2.match_id AND T1.hero_id <> T2.hero_id)\n'
                        'UNION\n'
                        '(SELECT T1.hero_id AS hero, T1.item_5 AS item_id, T2.hero_id AS opponent, T1.result AS result\n'
                        'FROM Plays_in AS T1, Plays_in AS T2\n'
                        'WHERE T1.match_id = T2.match_id AND T1.hero_id <> T2.hero_id)\n'
                        ') AS T\n'
                    'GROUP BY hero, item_id, opponent\n'
                    ') AS S NATURAL JOIN Item\n'
                'WHERE hero = %s AND opponent IN (%s, %s, %s, %s, %s)\n'
                'GROUP BY item_id\n'
                'ORDER BY aggregated_win_rate DESC'
            )
            cursor.execute(stmt, (my_hero, opponent_heroes[0], opponent_heroes[1], 
                opponent_heroes[2], opponent_heroes[3], opponent_heroes[4]))
            data = cursor.fetchall()
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except MySQLError as me:
        msg = "Got error {!r}, errno is {}".format(me, me.args[0])
    except:
        msg = "Unknown error"
    else:
        msg = "Success"
    print(msg)
    if len(data) == 0:
        data = [0]
    print(data)
    return json.dumps(data)


@app.route('/winPredict', methods=['POST'])
def win_predict():
    win_rate = 0
    try:
        # parse form
        form = request.get_json()
        radiant_heroes = [int(form[f'radiant_hero{i+1}']) for i in range(5)]
        dire_heroes = [int(form[f'dire_hero{i+1}']) for i in range(5)]
        win_rate = model.predict(radiant_heroes, dire_heroes)[0]
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except:
        msg = "Unknown error"
    else:
        msg = "Success"
    print(msg)
    return json.dumps(win_rate)


@app.route('/counterPickHero', methods=['POST'])
def counter_pick_hero():
    data = []
    try:
        # parse form
        form = request.get_json()
        hero = form['hero']
        results = session.run(
            (
                'MATCH (a:Hero)-[r:WINNING_RECORD]->(b:Hero) '
                'WHERE b.id = {id} AND r.total >= {threshold} '
                'RETURN a.name, toFloat(r.win)/r.total AS win_rate '
                'ORDER BY win_rate DESC '
                'LIMIT 5'
            ),
            {
                'id': hero,
                'threshold': 3
            }
        )
        for result in results:
            data.append(result)
    except KeyError as ke:
        msg = "Got error {!r}, errno is {}".format(ke, ke.args[0])
    except Neo4jError as ne:
        msg = "Got error {!r}, errno is {}".format(ne, ne.args[0])
    except:
        msg = "Unknown error"
    else:
        msg = "Success"
    print(msg)
    if len(data) == 0:
        data = [0]
    return json.dumps(data)


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
