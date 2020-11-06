import time
import pymysql.cursors
from pymysql import MySQLError
from dotaconstants_api import DotaConstantsAPI
from opendota_api import OpenDotaAPI


class DataManager:

    def __init__(self, conn):
        self.conn = conn
        self.dotaconstants_api = DotaConstantsAPI()
        self.opendota_api = OpenDotaAPI()

    def init_constant_data(self):
        heroes = self.dotaconstants_api.get_heroes()
        items = self.dotaconstants_api.get_items()

        try:
            with self.conn.cursor() as cursor:
                # insert heroes
                for key in heroes.keys():
                    entry = heroes[key]
                    stmt = 'INSERT INTO Hero VALUES(%s, %s)'
                    cursor.execute(stmt, (entry['id'], entry['localized_name']))

                # insert items
                for key in items.keys():
                    entry = items[key]
                    stmt = 'INSERT INTO Item VALUES(%s, %s)'
                    cursor.execute(stmt, (entry['id'], key))
            conn.commit()
            msg = "Insert successfully!"
        except MySQLError as e:
            msg = "Got error {!r}, errno is {}".format(e, e.args[0])

        print(msg)

    def insert_recent_matches(self):
        matches = []
        while len(matches) < 150:
            matches.extend(opendota_api.get_recent_matches(use_last_match=True))
            time.sleep(3)
        
        for match in matches:
            self.insert_match_with_player_stats(match['match_id'])
            time.sleep(3)

    def insert_player_with_recent_matches(self, account_id):
        matches = self.opendota_api.get_player_matches_history(account_id)
        for match in matches:
            self.insert_match_with_player_stats(match['match_id'])

    def insert_match_with_player_stats(self, match_id):
        match_info = opendota_api.get_match_info(match_id)

        # insert match
        start_time = match_info['start_time']
        self._insert_match(match_id, start_time)

        # insert player and player stats
        for player_stats in match_info['players']:
            account_id = player_stats['account_id']
            personaname = player_stats['personaname']
            self._insert_player(account_id, personaname)
            self._insert_player_stats(match_id, account_id, player_stats)

    def _insert_match(self, match_id, start_time):
        try:
            with self.conn.cursor() as cursor:
                # query if such match exists
                stmt = 'SELECT match_id FROM Matches WHERE match_id = %s'
                cursor.execute(stmt, (match_id))
                data = cursor.fetchone()
                if data:
                    print("[_insert_match] match already exists")
                else:
                    stmt = 'INSERT INTO Matches VALUES(%s, %s)'
                    cursor.execute(stmt, (match_id, start_time))
            conn.commit()
            print("[_insert_match] success")
        except MySQLError as e:
            print("[_insert_match] got error {!r}, errno is {}".format(e, e.args[0]))

    def _insert_player(self, account_id, personaname):
        try:
            with self.conn.cursor() as cursor:
                # query if such player exists
                stmt = 'SELECT account_id FROM Player WHERE account_id = %s'
                cursor.execute(stmt, (account_id))
                data = cursor.fetchone()
                if data:
                    print("[_insert_player] player already exists")
                else:
                    stmt = 'INSERT INTO Player VALUES(%s, %s, %s)'
                    cursor.execute(stmt, (account_id, personaname))
            conn.commit()
            print("[_insert_player] success")
        except MySQLError as e:
            print("[_insert_player] got error {!r}, errno is {}".format(e, e.args[0]))

    def _insert_plays_in(self, match_id, account_id, stats):
        try:
            with self.conn.cursor() as cursor:
                # query if such plays_in record exists
                stmt = 'SELECT account_id FROM Plays_in WHERE match_id = %s AND account_id = %s'
                cursor.execute(stmt, (match_id, account_id))
                data = cursor.fetchone()
                if data:
                    print("[_insert_plays_in] plays_in record already exists")
                else:
                    stmt = 'INSERT INTO Plays_in VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
                    cursor.execute(stmt, (
                            account_id,
                            match_id,
                            stats['kills'],
                            stats['assists'],
                            stats['deaths'],
                            stats['player_slot'],
                            stats['denies'],
                            stats['last_hits'],
                            stats['damage_taken'],
                            stats['damage'],
                            stats['gold_per_min'],
                            stats['xp_per_min'],
                            stats['hero_id'],
                            stats['item_0'],
                            stats['item_1'],
                            stats['item_2'],
                            stats['item_3'],
                            stats['item_4'],
                            stats['item_5'],
                            stats['win']
                        ))
            conn.commit()
            print("[_insert_plays_in] success")
        except MySQLError as e:
            print("[_insert_plays_in] got error {!r}, errno is {}".format(e, e.args[0]))
