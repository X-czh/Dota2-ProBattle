from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

import pickle

class Model:
    
    def __init__(self, path, C=0.005):
        self.path = path
        if path != '':
            self.model = pickle.load(path + "/model.pkl")
            self.scaler = pickle.load(path + "/scaler.pkl")
        else:
            self.model = LogisticRegression(C=C)
            self.scaler = StandardScaler()

    def train(train_data):
        x_train, y_train = train_data 
        scaler.fit(x_train)
        x_train = scaler.transform(x_train)
        model.fit(x_train, y_train)
        
        # save model and scaler
        with open(self.path + "model.pkl", "wb") as file:
            pickle.dump(self.model, file)

        with open(self.path + "scaler.pkl", "wb") as file:
            pickle.dump(self.scaler, file)

    def predict(test_data):
        test_data = scaler.transform(test_data)
        prob = model.predict_proba(test_data)

        return prob

