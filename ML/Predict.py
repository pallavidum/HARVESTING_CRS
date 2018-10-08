from CreditRisk import CreditRisk
import pickle
import sys
import json
import pandas as pd
import numpy as np
from sklearn.utils.validation import check_is_fitted
import os

class Prediction:
    def __init__(self,json_str,uuid_t):
        self.json_str = json_str
        self.uuid_t = uuid_t
    def run(self):
        root_directory = os.path.dirname(os.path.abspath(__file__))
        attributes_dir = 'temp_attributes'
        attr_path = os.path.join(root_directory, attributes_dir,  self.uuid_t + ".csv")
        fr = open(attr_path, 'rb')
        itemlist = pickle.load(fr)
        itemlist.pop()
        fr.close()
        parsed_json =json.loads(self.json_str)
        json_key = []
        for key in parsed_json:
            json_key.append(key)
        if set(json_key) == set(itemlist):
            df = pd.DataFrame()
            json_value = []
            for l in itemlist:
                json_value.append(str(parsed_json[l]))
            list_tuple = []
            list_tuple.append(tuple(json_value))
            df_predict = pd.DataFrame.from_records(list_tuple, columns=itemlist)
            df_predict.columns = [x.lower() for x in df_predict.columns]
            cr = CreditRisk("", self.uuid_t)
            datadir = os.path.join(root_directory, 'data', self.uuid_t + '.xls')
            df = pd.read_excel(datadir, header=1)
            df.columns = [x.lower() for x in df.columns]
            frame = [df, df_predict]
            df_result = pd.concat(frame)
            df_orig, classes = cr.read_file(df, "")
            X, y = cr.test_train_matrix(df_orig)
            X_predict = cr.feature_select(X, y, 0.2, True)
            pkl_filename = os.path.join(root_directory, "temp_models", self.uuid_t+".sav")
            with open(pkl_filename, 'rb') as file:
                pickle_model = pickle.load(file)
            prediction = pickle_model.predict(X_predict.reshape(1, -1))
            return str(prediction[0])
        else:
            return "Argument List Not Matching or Incomplete"
