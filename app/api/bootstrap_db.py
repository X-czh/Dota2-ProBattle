import pymysql.cursors
from pymysql import MySQLError
from data_manager import DataManager
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", type=str, default="None",
                        help="database host")
    parser.add_argument("--user", type=str, default="None",
                        help="database user")
    parser.add_argument("--pwd", type=str, default="None",
                        help="database password")

    args = parser.parse_args()

    host = args.host
    user = args.user
    password = args.pwd
    print("####" + password)
    conn = pymysql.connect(host=host,
                        user=user,
                        password="Dota2ProBattlePWD",
                        db='dota2probattle',
                        charset='utf8mb4',
                        cursorclass=pymysql.cursors.DictCursor)
    data_manager = DataManager(conn)

    print("Init Dota2 constant data...")
    data_manager.init_constant_data()

    print("Bootstrap DB with recent matches...")
    data_manager.insert_recent_matches()
