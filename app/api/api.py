from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app, support_credentials=True)


# # Configure MySQL
# import pymysql.cursors
# from pymysql import MySQLError
# conn = pymysql.connect(host='localhost',
#                        user='root',
#                        password='Dota2ProBattlePWD',
#                        db='dota2probattle',
#                        charset='utf8mb4',
#                        cursorclass=pymysql.cursors.DictCursor)


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/searchMatch', methods=['POST'])
def search_match():
    # grab information
    form = request.get_json()['match']
    match_id = form['match_id']

    msg = "Success"
    # try:
    #     with conn.cursor() as cursor:
    #         stmt = 'SELECT * FROM Matches WHERE match_id = %s'
    #         cursor.execute(stmt, (match_id))
    #         data = cursor.fetchone()
    # except MySQLError as e:
    #     msg = "Got error {!r}, errno is {}".format(e, e.args[0])
    
    return msg


@app.route('/addMatch', methods=['POST'])
def add_match():
    # grab information
    form = request.get_json()['match']
    match_id = form['match_id']
    start_time = form['start_time']
    player_ids = [form[f'player{i+1}_id'] for i in range(10)]

    # msg = "Success"
    # try:
    #     # with conn.cursor() as cursor:

    #     #     ins = 'INSERT INTO Matches VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)'
    #     #     cursor.execute(ins, (match_id, start_time))
    #     # conn.commit()
    #     pass
    # except MySQLError as e:
    #     msg = 'Got error {!r}, errno is {}'.format(e, e.args[0])

    msg = "Random" 
    return msg


@app.route('/deleteMatch', methods=['POST'])
def delete_match():
    # grab information
    form = request.get_json()['match']
    match_id = form['id']

    # try:
    #     with conn.cursor() as cursor:
    #         # query if such match exists
    #         stmt = 'SELECT match_id FROM Matches WHERE match_id = %s'
    #         cursor.execute(stmt, (match_id))
    #         data = cursor.fetchone()
    #         if not data:
    #             return "No match found!"

    #         # delete the match
    #         stmt = 'DELETE FROM Matches WHERE match_id = %s'
    #         cursor.execute(stmt, (match_id))
    #     conn.commit()
    #     msg = "Delete succeeds!"
    # except MySQLError as e:
    #     msg = "Got error {!r}, errno is {}".format(e, e.args[0])
    
    msg = "Random"
    return msg


@app.route('/debuffOpponentHero', methods=['POST'])
def debuff_opponent_hero():
    pass


@app.route('/debuffOpponentItem', methods=['POST'])
def debuff_opponent_item():
    # grab information
    form = request.get_json()['heros']
    my_hero = form['myhero']
    opponent_heroes = [form[f'opponenthero{i+1}'] for i in range(5)]

    return {
        'item1': 'i1',
        'item2': 'i2',
        'item3': 'i3',
        'item4': 'i4',
        'item5': 'i5',
        'item6': 'i6'
        }


if __name__ == "__main__":
    app.run()
