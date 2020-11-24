from ml_prediction.model import Model

model = Model("ml_prediction")
radiant_heroes = [1, 2, 3, 4, 5]
dire_heroes = [6, 7, 8, 9, 10]
print(model.predict(radiant_heroes, dire_heroes))