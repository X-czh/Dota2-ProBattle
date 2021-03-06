# Dota2-ProBattle

Dota2-ProBattle is a web app that provides players with useful information to help them win and boost their Dota 2 skills. It provides:

* Opponents' most commonly used heroes
* Counter picks of opponents' heroes
* Recommendation of items againt opponents' lineup
* Winning chance against the opponents’ lineup

Check out more info by watching our [introduction video](https://youtu.be/pqxyu1WNbUg) or reading our [wiki page](https://github.com/X-czh/Dota2-ProBattle/wiki).

## Screenshot

![Screenshot](screenshot.png)

## Remote deployment

We host the web app remotely at this [link](http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/) (most likely already expired when you read this). Since we are poor, we only rely on free cloud services and cannot host the app for too long. The frontend and backend are hosted on two separate AWS EC2 micro instances. The MySQL server is hosted via Amazon RDS. The Neo4j server is hosted via Neo4j Sandbox.

## Dependency

This project is developed and tested with

* Node 14.15.0
* Yarn 1.22.5
* Python 3.8.5
* MySQL 8.0.22
* Neo4j 4.2.0

## Install

Make sure you have all the dependencies installed, and the MySQL server and the Neo4j server are running.

```sh
git clone --recurse-submodules https://github.com/X-czh/Dota2-ProBattle.git
cd Dota2-ProBattle

# Replace the MySQL and Neo4j configurations with your own ones
# WARNING: It will drop the existing database first and create a new one!
source install.sh
```

## Run

Under `/app`:

### Develop Mode

```sh
# In one terminal
yarn run start

# In another terminal
yarn run start-api
```

### Deploy Mode

```sh
yarn run build
cd api && source venv/bin/activate && python3 api.py
```

## The Team

Front End: [Tian Liu](https://github.com/TL021), [Zijie Lu](https://github.com/zjzijielu)

Back End: [Zhanghao Chen](https://github.com/X-czh)

Machine Learning: [Zijie Lu](https://github.com/zjzijielu)
