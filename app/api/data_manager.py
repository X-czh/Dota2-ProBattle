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

            # insert special item with item_id 0 representing empty item
            stmt = 'INSERT INTO Item VALUES(%s, %s)'
            cursor.execute(stmt, (0, ""))

            # insert special player with account_id 0 representing players 
            # who do not make their match records public
            stmt = 'INSERT INTO Player VALUES(%s, %s)'
            cursor.execute(stmt, (0, ""))

        self.conn.commit()

    def insert_recent_matches(self):
        matches = []
        while len(matches) < 100:
            matches.extend(self.opendota_api.get_recent_matches(use_last_match=True))
            time.sleep(2)
        
        for match in matches:
            self.insert_match_with_player_stats(match['match_id'])
            time.sleep(2)

    def insert_player_with_recent_matches(self, account_id):
        matches = self.opendota_api.get_player_recent_matches(account_id)

        # sanity check
        if (len(matches) == 0):
            raise ValueError("No recent match found or invalid account_id")

        for match in matches:
            self.insert_match_with_player_stats(match['match_id'])
            time.sleep(2)

    def insert_match_with_player_stats(self, match_id):
        match_info = self.opendota_api.get_match_info(match_id)
        
        # sanity check
        if 'error' in match_info:
            raise ValueError(match_info['error'])

        # insert match
        start_time = match_info['start_time']
        self._insert_match(match_id, start_time)

        # insert player and player stats
        for player_stats in match_info['players']:
            account_id = player_stats['account_id']
            if account_id is None:
                account_id = 0 # special account_id for players who do not make their match records public
            if 'personname' in player_stats:
                personaname = player_stats['personaname']
            else:
                personaname = ""
            self._insert_player(account_id, personaname)
            self._insert_plays_in(match_id, account_id, player_stats)

    def _insert_match(self, match_id, start_time):
        print(f"inserting match - id: {match_id}, start_time: {start_time}")
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
        self.conn.commit()
        print("[_insert_match] success")

    def _insert_player(self, account_id, personaname):
        print(f"inserting player - id: {account_id}, personaname: {personaname}")
        with self.conn.cursor() as cursor:
            # query if such player exists
            stmt = 'SELECT account_id FROM Player WHERE account_id = %s'
            cursor.execute(stmt, (account_id))
            data = cursor.fetchone()
            if data:
                print("[_insert_player] player already exists")
            else:
                stmt = 'INSERT INTO Player VALUES(%s, %s)'
                cursor.execute(stmt, (account_id, personaname))
        self.conn.commit()
        print("[_insert_player] success")

    def _insert_plays_in(self, match_id, account_id, stats):
        print(f"inserting plays_in - match id: {match_id}, account_id: {account_id}")
        with self.conn.cursor() as cursor:
            # query if such plays_in record exists
            stmt = 'SELECT account_id FROM Plays_in WHERE match_id = %s AND account_id = %s'
            cursor.execute(stmt, (match_id, account_id))
            data = cursor.fetchone()
            if data:
                print("[_insert_plays_in] plays_in record already exists")
            else:
                stmt = 'INSERT INTO Plays_in VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
                cursor.execute(stmt, (
                        account_id,
                        match_id,
                        stats['kills'],
                        stats['assists'],
                        stats['deaths'],
                        stats['player_slot'],
                        stats['denies'],
                        stats['last_hits'],
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
        self.conn.commit()
        print("[_insert_plays_in] success")
