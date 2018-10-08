# https://github.com/natbusa/deepcredit/blob/master/default-prediction.ipynb
# Dependencies -
# 1. python -m pip install --user numpy scipy matplotlib ipython jupyter pandas sympy nose
# 2. pip install -U scikit-learn
# 3. pip install wget, pip install xlrd, pip install patsy, pip install xgboost

import itertools
import random
import os
import re
import shutil
import wget
import urllib
import shutil
import numpy as np
from math import log
import json
import xlrd
import pandas as pd
from patsy import dmatrices
import warnings
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.metrics import roc_curve, auc, roc_auc_score, log_loss, accuracy_score, confusion_matrix
from sklearn import preprocessing
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_recall_curve
from sklearn.metrics import average_precision_score
from sklearn.model_selection import KFold, LeaveOneOut
import matplotlib.pyplot as plt
import scikitplot as skplt
import random
import uuid
import pickle
import ssl
from collections import Counter
from operator import itemgetter
import pymongo
from pymongo import MongoClient
from pathlib import Path
ssl._create_default_https_context = ssl._create_unverified_context

np.random.seed(1337)

# class to load, save, and score data/models
class CreditRisk:
    def __init__(self, url, uuid_t):
        self.url = url
        self.uuid_t = uuid_t
        self.root_dir = os.path.dirname(os.path.abspath(__file__))

    # download user uploaded data from url
    def download_file(self):
        df = pd.read_excel(self.url, header=1)
        df.columns = [x.upper() for x in df.columns]
        return df

    # reads file from local (tries for combined data csv first,
    # then uncombined csv, then defaults to downloading csv from url)
    # note that uuid must remain constant for each dataset + model
    # TODO ideally models and datasets should be saved (user_id + uuid)
    def read_file(self):
        cd = os.path.dirname(os.path.abspath(__file__))
        filename = cd + "/user_aie_datasets/" + self.uuid_t + "-aie"
        filepath = Path(filename)
        if filepath.is_file():
            return pd.read_csv(filename, encoding='utf-8')
        else:
            filename = cd + "/user_datasets/" + self.uuid_t
            filepath = Path(filename)
            if filepath.is_file():
                return pd.read_csv(filename, encoding='utf-8')
            else:
                return self.download_file()

    # reads local aie excel file
    # TODO need to figure out way to select aie file based on user uploaded data
    # TODO need to come up with vectorizing for categorical features
    def read_aie_file(self, filename, default_col):
        # TODO may need to provide path to filename
        df = pd.read_excel(filename)
        df.columns = [x.upper() for x in df.columns]
        if default_col in df.columns:
            df = df.drop([default_col], axis=1)
            df['DISTRICT'] = df['DISTRICT'].astype('category')
            df['SUB-DISTRICT'] = df['SUB-DISTRICT'].astype('category')
            df['CROP_TYPE'] = df['CROP_TYPE'].astype('category')
            df['COUNTRY'] = df['COUNTRY'].astype('category')
            df['STATE'] = df['STATE'].astype('category')
            cat_columns = df.select_dtypes(['category']).columns
            df[cat_columns] = df[cat_columns].apply(lambda x: x.cat.codes)
            #print(cat_columns)
            # TODO need to keep mappings from category columns
        return df

    # writes file with feature names to local csv
    # TODO may want to save full file instead of just feature names
    def write_file(self, df, default_col, uuid_t):
        #df = self.order_dataset_by_feature_name(df)
        features = list(df.columns.values)
        df.columns = [x.upper() for x in df.columns]

        if uuid_t != "":
            features_dir = os.path.join(self.root_dir, 'temp_features')
            if not os.path.exists(features_dir):
                os.makedirs(features_dir)
            fw = open(features_dir + "/" + uuid_t + ".csv", 'wb')
            pickle.dump(features, fw, pickle.HIGHEST_PROTOCOL)
            fw.close()

        #TEMP_DEFAULT_FEATURE = "DEFAULT"
        #Processing = FeatureProcessing()
        #target_feature_name = Processing.target_feature_name(TEMP_DEFAULT_FEATURE, df)
        classes = sorted(df[default_col].unique())
        return df, classes

    # create train test matrix from dataframe
    def test_train_matrix(self, df, default_col):
        attrs = list(df.columns.values)
        #print(attrs)
        # TODO need to make this dynamic
        #Processing = FeatureProcessing()
        #default_col_name = Processing.target_feature_name("DEFAULT", df)
        #print(default_col_name[0])
        formula = 'Q("'+ default_col +'") ~ '
        #formula += 'Q("limit bal")'
        for i in attrs:
            if "DEFAULT" not in i:
                if ("categorical" in i):
                    formula += '+' + 'C(Q("'+ i + '"))'
                else:
                    formula += '+' + 'Q("'+ i + '")'
        #print(formula)
        y, X = dmatrices(formula, data=df, return_type='dataframe')
        y = y.iloc[:, 0]
        # print X.shape
        return X, y

    # returns partitioned train and test data from train test matrix for ml training
    def split_train_test(self, X, y, test_size, is_predict, k_best):
        warnings.simplefilter(action='ignore', category=(
            UserWarning, RuntimeWarning))
        selector = SelectKBest(f_classif, k_best)
        selector.fit(X, y)
        top_indices = np.nan_to_num(selector.scores_).argsort()[-k_best:][::-1]
        scaler = preprocessing.MinMaxScaler()
        scaler.fit(X)
        preprocess = Pipeline([('anova', selector), ('scale', scaler)])
        preprocess.fit(X, y)
        # print X.iloc[[-1]]
        X_prep = preprocess.transform(X)
        X_train, X_test, y_train, y_test = train_test_split(
            X_prep, y, test_size=test_size, random_state=42)
        return (X_train, X_test, y_train, y_test) if not is_predict else X_prep[[-1]]

    # returns values for confusion matrix
    def plot_cm(self, y_true, y_pred, classes, title, th=0.5):
        y_pred_labels = (y_pred > th).astype(int)
        cm = confusion_matrix(y_true, y_pred_labels)
        return cm.tolist()

    # returns values for plotting ROC AUC Curve
    def plot_auc(self, y_train, y_train_pred, y_test, y_test_pred, th=0.5):

        y_train_pred_labels = (y_train_pred > th).astype(int)
        y_test_pred_labels = (y_test_pred > th).astype(int)

        fpr_train, tpr_train, _ = roc_curve(y_train, y_train_pred)
        roc_auc_train = auc(fpr_train, tpr_train)
        acc_train = accuracy_score(y_train, y_train_pred_labels)

        fpr_test, tpr_test, _ = roc_curve(y_test, y_test_pred)
        roc_auc_test = auc(fpr_test, tpr_test)
        acc_test = accuracy_score(y_test, y_test_pred_labels)

        average_precision = average_precision_score(y_test, y_test_pred)
        precision, recall, _ = precision_recall_curve(y_test, y_test_pred)

        index_sample = sorted(random.sample(range(1, precision.size - 1), 200))

        pre_200 = np.take(precision, index_sample)
        rec_200 = np.take(recall, index_sample)

        if fpr_train.size > 200:
            train_sample = sorted(random.sample(
                range(1, fpr_train.size - 1), 200))
            test_sample = sorted(random.sample(
                range(1, fpr_test.size - 1), 200))
        else:
            train_sample = range(0, fpr_train.size - 1)
            test_sample = range(0, fpr_test.size - 1)

        auc_values = {'fpr_train': np.around(np.take(fpr_train, train_sample), decimals=4).tolist(),
                      'tpr_train': np.around(np.take(tpr_train, train_sample), decimals=4).tolist(),
                      'roc_auc_train': roc_auc_train,
                      'acc_train': acc_train,
                      'fpr_test': np.around(np.take(fpr_test, test_sample), decimals=4).tolist(),
                      'tpr_test': np.around(np.take(tpr_test, test_sample), decimals=4).tolist(),
                      'roc_auc_test': roc_auc_test,
                      'acc_test': acc_test,
                      'pre_200': np.around(pre_200, decimals=4),
                      'rec_200': np.around(rec_200, decimals=4)
                      }
        return auc_values

    # TODO integration test
    # returns precision and recall scores
    def plot_precision_recall(self, y_test, y_score):
        precision, recall, _ = precision_recall_curve(y_test, y_score)
        return precision, recall

    # TODO integration test and confirm to see if computation is correct
    # returns tuple of lists x and y for plotting gains chart
    def plot_gain(self, y_actual, y_pred_proba):
        df = pd.DataFrame({"ACTUAL": y_actual, "PRED_PROB": y_pred_proba})
        df.groupby(["PRED_PROB"]).mean()
        x = np.arange(1/len(y_actual), 1, 1/len(y_actual))
        y = np.arange(1/len(y_actual), 1, 1/len(y_actual))
        pos = df.nunique()[1]
        sup = 0
        for idx, val in enumerate(y_actual):
            if val == 1:
                sup+=1
            y[idx] = sup/pos
        #df_gain = pd.DataFrame({"ACTUAL": x, "PRED_PROB": y})
        return (x, y)

    # TODO implement
    def plot_lift(self):
        raise NotImplementedError

    # return ml evaluations in json format for frontend
    def scores(self, score, y_train, y_train_pred, y_test, y_test_pred, classes, uuid_t):
        threshold = 0.5
        cm_train = self.plot_cm(y_train, y_train_pred, [
                                0, 1], 'Confusion matrix (TRAIN)', threshold)
        cm_test = self.plot_cm(y_test, y_test_pred, [
                               0, 1], 'Confusion matrix (TEST)', threshold)
        roc_data = self.plot_auc(
            y_train, y_train_pred, y_test, y_test_pred, threshold)
        json_data = {
            'roc_data': roc_data,
            'cm_train': cm_train,
            'cm_test': cm_test,
            'classes': classes,
            'uuid_t': self.uuid_t,
            'scores': score
        }
        json_str = json.dumps(json_data, cls=Int64_Encoder)
        return json_str

    # returns model classification accuracy
    def get_model_accuracy(self, model, X_test, y_test):
        return model.score(X_test, y_test)

    # TODO unit test
    # returns specificity score
    def specificity_score(self, y_actual, y_pred):
        # = true negative / (true negative + false positives) = true negative / negative population
        tn, fp, fn, tp = confusion_matrix(y_actual, y_pred).ravel()
        return tn / (tn+fp)

    # saves model to temp_models directory and returns uuid_t (name of saved model)
    def save_model(self, model):
        uuid_t = uuid.uuid4().hex
        models_dir = os.path.join(self.root_dir, 'temp_models')
        if not os.path.exists(models_dir):
            os.makedirs(models_dir)
        pickle.dump(model, open(models_dir + "/" + self.uuid_t + ".sav", 'wb'))
        return uuid_t

    # TODO unit test
    # loads and returns model from temp_models
    def load_model(self):
        uuid_t = uuid.uuid4().hex
        models_dir = os.path.join(self.root_dir, 'temp_models')
        if not os.path.exists(models_dir):
            return
        with open(models_dir + "/" + self.uuid_t + 'save', 'rb') as file:
            model = pickle.load(file)
        return model

    # TODO unit and integration test
    # TODO apply in LogisticRegression, RandomForest, GradientBoost
    # computes credit score based on probability of default
    def compute_credit_score(self, proba_default):
        MIN_SCORE = 0
        FACTOR = 20 / np.log(2)
        INTERCEPT = 600 - FACTOR * np.log(50)
        score = np.round(np.log((1 - proba_default)/proba_default) * FACTOR + INTERCEPT)
        if score < 0:
            return MIN_SCORE
        else:
            return score


class Int64_Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(Int64_Encoder, self).default(obj)
