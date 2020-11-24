from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import numpy as np

import pickle

class Model:
    
    def __init__(self, path, C=0.005):
        self.path = path
        self.num_of_heores = 119
        if path != '':
            print(path + "/model.pkl")
            with open(path + "/model.pkl", "rb") as model_pkl:
                self.model = pickle.load(model_pkl)
            with open(path + "/scaler.pkl", "rb") as scaler_pkl:
                self.scaler = pickle.load(scaler_pkl)
        else:
            self.model = LogisticRegression(C=C)
            self.scaler = StandardScaler()

    def train(self, x_train, y_train):
        self.scaler.fit(x_train)
        x_train = self.scaler.transform(x_train)
        print("start training...")
        self.model.fit(x_train, y_train)
        print("finish training. saving model...")

        # save model and scaler
        with open(self.path + "model.pkl", "wb") as file:
            pickle.dump(self.model, file)

        with open(self.path + "scaler.pkl", "wb") as file:
            pickle.dump(self.scaler, file)

    def predict(self, radiant_heroes, dire_heroes):
        """
            return the probability of radiant winning the game
        """
        features = np.zeros(2 * self.num_of_heores)
        for i in range(5):
            features[radiant_heroes[i] - 1] = 1
            features[dire_heroes[i] - 1 + self.num_of_heores] = 1
        features_reshaped = features.reshape(1, -1)
        features_final = self.scaler.transform(features_reshaped)
        prob = self.model.predict_proba(features_final)[:, 1]

        return prob

