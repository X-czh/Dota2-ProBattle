import pymysql.cursors
from neo4j import GraphDatabase, basic_auth
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
    NEO4J_HOST = env('NEO4J_HOST')
    NEO4J_USER = env('NEO4J_USER')
    NEO4J_PWD = env('NEO4J_PWD')

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

    print("Reset Neo4j batabase...")
    session.run('MATCH (n) DETACH DELETE n')

    # Configure Data Manager
    data_manager = DataManager(conn, session)

    print("Init Dota2 constant data...")
    data_manager.init_constant_data()

    print("Bootstrap DB with recent matches...")
    data_manager.insert_recent_matches()
