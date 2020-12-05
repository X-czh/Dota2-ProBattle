MYSQL_HOST=host
MYSQL_PORT=0000
MYSQL_USER=user
MYSQL_PWD=password
MYSQL_DB=dota2probattle

NEO4J_HOST=host
NEO4J_USER=user
NEO4J_PWD=password

# create database
mysql --host=$MYSQL_HOST --port=$MYSQL_PORT --user=$MYSQL_USER --password=$MYSQL_PWD -e "source db.sql" &&

# install react project
cd app && yarn install &&

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
