import pymysql.cursors
from dotenv import load_dotenv, find_dotenv
from data_manager import DataManager
from util import env


if __name__ == "__main__":
    # Load environment variables
    load_dotenv(find_dotenv())
    MYSQL_HOST = env('MYSQL_HOST')
    MYSQL_USER = env('MYSQL_USER')
    MYSQL_PWD = env('MYSQL_PWD')
    MYSQL_DB = env('MYSQL_DB')

    # Configure MySQL
    conn = pymysql.connect(host=MYSQL_HOST,
                        user=MYSQL_USER,
                        password=MYSQL_PWD,
                        db=MYSQL_DB,
                        charset='utf8mb4',
                        cursorclass=pymysql.cursors.DictCursor)
    
    data_manager = DataManager(conn)

    print("Init Dota2 constant data...")
    data_manager.init_constant_data()

    print("Bootstrap DB with recent matches...")
    data_manager.insert_recent_matches()
