import json


class DotaConstantsAPI():

    def get_heroes(self):
        with open('../dotaconstants/build/heroes.json') as f:
            data = json.load(f)
        return data

    def get_items(self):
        with open('../dotaconstants/build/items.json') as f:
            data = json.load(f)
        return data
