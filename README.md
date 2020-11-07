# Dota2-ProBattle

## Dependency

* Node.js
* Yarn
* Python 3.8
* MySQL 8.0

## Install

Make sure you have all the dependencies installed and MySQL Server is running.

```sh
git clone --recurse-submodules https://github.com/X-czh/Dota2-ProBattle.git
cd Dota2-ProBattle

# Replace the MySQL host, user and password with your own ones
# WARNING: It will drop the existing database first and create a new one!
source install.sh
```

## Run

Under `/app`:

### Develop mode

```sh
# In one terminal
yarn start

# In another terminal
yarn start-api
```

### Deploy mode

```sh
yarn build
cd api && source venv/bin/activate && python3 api.py
```
