from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app, support_credentials=True)

# Configure MySQL
# import pymysql.cursors
# conn = pymysql.connect(host='localhost',
#                        user='root',
#                        password='password',
#                        db='dota2probattle',
#                        charset='utf8mb4',
#                        cursorclass=pymysql.cursors.DictCursor)

@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/addMatch', methods=['POST'])
def add_match():
    pass


@app.route('/searchMatch', methods=['POST'])
def search_match():
    pass


@app.route('/deleteMatch', methods=['POST'])
def delete_match():
    pass

@app.route('/debuffOpponentHero', methods=['POST'])
def debuff_opponent_hero():
    pass

@app.route('/debuffOpponentItem', methods=['POST'])
def debuff_opponent_item():
    # grab information from the forms
    form = request.get_json()['heros']
    my_hero = form['myhero']
    opponent_hero_1 = form['opponenthero1']
    opponent_hero_2 = form['opponenthero2']
    opponent_hero_3 = form['opponenthero3']
    opponent_hero_4 = form['opponenthero4']
    opponent_hero_5 = form['opponenthero5']

    print(my_hero)
    print(opponent_hero_1)
    print(opponent_hero_2)
    print(opponent_hero_3)
    print(opponent_hero_4)
    print(opponent_hero_5)

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
