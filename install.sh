HOST="database-1.ce4xuqw1rbhz.us-east-1.rds.amazonaws.com"
PORT=3306
USER="admin"
PWD="Dota2ProBattlePWD"

# create database
mysql --host=$HOST -P $PORT --user=$USER --password=$PWD -e "source db.sql" &&

# install react project
cd app && npm install &&

# install python3 venv
cd api && python3 -m venv venv &&

# install python3 packages
source venv/bin/activate && pip3 install -r requirements.txt &&

# bootstrap database
python3 bootstrap_db.py --host $HOST --user $USER
