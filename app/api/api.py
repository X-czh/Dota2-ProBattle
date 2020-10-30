import time
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app, support_credentials=True)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/addItem', methods=['GET'])
def add_item():
    print("server received request")
    return {'name': "bloodseeker"}

if __name__ == "__main__":
    app.run()
