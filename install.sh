HOST="localhost"
USER="root"
PWD="Dota2ProBattlePWD"

# create database
mysql --host=$HOST --user=$USER --password=$PWD -e "source db.sql" &&

# install react project
cd app && yarn install &&

# install python3 venv
cd api && python3 -m venv venv &&

# install python3 packages
source venv/bin/activate && pip3 install -r requirements.txt &&

# bootstrap database
python3 bootstrap_db.py
