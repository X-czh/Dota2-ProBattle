from model import Model
import pandas as pd
import numpy as np

def load_dataset(csv_path):
    df = pd.read_csv(csv_path, encoding='unicode_escape')

    low_mmr = 500
    high_mmr = 2000

    df = df[df.avg_mmr > low_mmr]
    df = df[df.avg_mmr < high_mmr]
    
    print("the dataset contains {} games".format(len(df)))

    num_of_heroes = 119 # hardcod

    # convert df to features
    x_matrix = np.zeros((df.shape[0], 2 * num_of_heroes))
    y_matrix = np.zeros(df.shape[0])

    df_np = df.values

    for i, row in enumerate(df_np):
        radiant_win = row[1]
        radiant_heroes = list(map(int, row[2].split(',')))
        dire_heroes = list(map(int, row[3].split(',')))

        for j in range(5):
            x_matrix[i, radiant_heroes[j] - 1] = 1
            x_matrix[i, dire_heroes[j] - 1 + num_of_heroes] = 1
        
        y_matrix[i] = 1 if radiant_win else 0

    return x_matrix, y_matrix

def main():
    model = Model(path="")

    # load data
    csv_path = "706e_train_dataset.csv"
    x_train, y_train = load_dataset(csv_path)

    model.train(x_train, y_train)
    

if __name__ == "__main__":
    main()