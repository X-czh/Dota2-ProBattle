MYSQL_HOST="localhost"
MYSQL_USER="root"
# MYSQL_HOST="database-1.ce4xuqw1rbhz.us-east-1.rds.amazonaws.com"
MYSQL_PORT=3306
# MYSQL_USER="admin"
MYSQL_PWD="Dota2ProBattlePWD"
MYSQL_DB="dota2probattle"

# create database
mysql --host=$MYSQL_HOST --port=$MYSQL_PORT --user=$MYSQL_USER --password=$MYSQL_PWD -e "source db.sql" &&

# install react project
cd app && npm install &&

# install python3 venv
cd api && python3 -m venv venv &&

# install python3 packages
source venv/bin/activate && pip3 install -r requirements.txt &&

# generate .env file
echo MYSQL_HOST=$MYSQL_HOST > .env &&
echo MYSQL_USER=$MYSQL_USER >> .env &&
echo MYSQL_PWD=$MYSQL_PWD >> .env &&
echo MYSQL_DB=$MYSQL_DB >> .env &&

# bootstrap database
python3 bootstrap_db.py
