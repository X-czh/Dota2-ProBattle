MYSQL_HOST=localhost
# MYSQL_HOST=database-1.ce4xuqw1rbhz.us-east-1.rds.amazonaws.com
MYSQL_PORT=3306
MYSQL_USER=root
# MYSQL_USER=admin
MYSQL_PWD=Dota2ProBattlePWD
MYSQL_DB=dota2probattle

NEO4J_HOST=bolt://54.175.38.249:37120
NEO4J_USER=neo4j
NEO4J_PWD=vehicle-means-keys

# create database
mysql --host=$MYSQL_HOST --port=$MYSQL_PORT --user=$MYSQL_USER --password=$MYSQL_PWD -e "source db.sql" &&

# install react project
cd app && yarn run install &&

# install python3 venv
cd api && python3 -m venv venv &&

# install python3 packages
source venv/bin/activate && pip3 install -r requirements.txt &&

# generate .env file
echo MYSQL_HOST=$MYSQL_HOST > .env &&
echo MYSQL_USER=$MYSQL_USER >> .env &&
echo MYSQL_PWD=$MYSQL_PWD >> .env &&
echo MYSQL_DB=$MYSQL_DB >> .env &&
echo NEO4J_HOST=$NEO4J_HOST >> .env &&
echo NEO4J_USER=$NEO4J_USER >> .env &&
echo NEO4J_PWD=$NEO4J_PWD >> .env &&

# bootstrap database
python3 bootstrap_db.py
