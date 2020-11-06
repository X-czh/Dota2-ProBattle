import pymysql.cursors
from pymysql import MySQLError
from data_manager import DataManager

if __name__ == "__main__":
    conn = pymysql.connect(host='localhost',
                        user='root',
                        password='Dota2ProBattlePWD',
                        db='dota2probattle',
                        charset='utf8mb4',
                        cursorclass=pymysql.cursors.DictCursor)
    data_manager = DataManager(conn)

    print("Init Dota2 constant data...")
    data_manager.init_constant_data()

    print("Bootstrap DB with recent matches...")
    data_manager.insert_recent_matches()
