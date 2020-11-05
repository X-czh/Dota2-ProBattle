# Dota2-ProBattle

## Dependency

* Node.js
* Yarn
* Python
* MySQL

## Install

Under `/app`:

```sh
cd app && yarn install
cd api && python3 -m venv venv
source venv/bin/activate && pip3 install -r requirements.txt
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
