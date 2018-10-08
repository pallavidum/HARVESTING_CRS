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
import random
import uuid
import pickle
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

np.random.seed(1337)


class CreditRisk:
    def __init__(self, url, uuid_t):
        self.url = url
        self.uuid_t = uuid_t
        self.root_dir = os.path.dirname(os.path.abspath(__file__))

    def download_file(self):
        # url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls'
        datadir = os.path.join(self.root_dir, 'data')
        if not os.path.exists(datadir):
            os.makedirs(datadir)
        filename = os.path.join(datadir, self.uuid_t + '.xls')
        if not os.path.isfile(filename):
            wget.download(self.url, out=filename)

        df = pd.read_excel(filename, header=1)
        return df

    def selcols(self, prefix, a=1, b=6):
        return [prefix + str(i) for i in np.arange(a, b + 1)]

    def read_file(self, df, uuid_t):
        #df = pd.read_excel(filename, header=1)
        attributes = list(df.columns.values)

        df.columns = [x.lower() for x in df.columns]
        df = df.rename(index=str, columns={"pay_0": "pay_1"})

        if uuid_t != "":
            attributes_dir = os.path.join(self.root_dir, 'temp_attributes')
            if not os.path.exists(attributes_dir):
                os.makedirs(attributes_dir)
            fw = open(attributes_dir + "/" + uuid_t + ".csv", 'wb')
            pickle.dump(attributes, fw, pickle.HIGHEST_PROTOCOL)
            fw.close()

        df = df.drop('id', axis=1)
        df['target'] = df['default payment next month'].astype('category')
        classes = sorted(df['target'].unique())
        df['age_cat'] = pd.cut(df['age'], range(0, 100, 10), right=False)
        df['sex'] = df['sex'].astype(
            'category').cat.rename_categories(['M', 'F'])
        df['marriage'] = df['marriage'].astype('category').cat.rename_categories([
            'na', 'married', 'single', 'other'])
        df['pay_avg'] = df[self.selcols('pay_')].mean(axis=1)
        df['pay_std'] = df[self.selcols('pay_')].std(axis=1)
        df['pay_amt_avg'] = df[self.selcols('pay_amt')].mean(axis=1)
        df['pay_amt_avg_log'] = df['pay_amt_avg'].apply(lambda x: log(x + 1))
        for i in np.arange(1, 7):
            df['pay_relamt' + str(i)] = df['pay_amt' +
                                           str(i)] / df['pay_amt_avg']
        for i in np.arange(1, 7):
            df['pay_amt_log' + str(i)] = df['pay_amt' +
                                            str(i)].apply(lambda x: log(x + 1))
        df['bill_amt_avg'] = df[self.selcols('bill_amt')].mean(axis=1)
        df['bill_amt_avg_log'] = df['bill_amt_avg'].apply(
            lambda x: log(x + 1) if x > 0 else 0)
        for i in np.arange(1, 7):
            df['bill_amt_sign' + str(i)] = df['bill_amt' +
                                              str(i)].apply(lambda x: float(x > 0))
        for i in np.arange(1, 7):
            df['bill_amt_log' + str(i)] = df['bill_amt' + str(i)
                                             ].apply(lambda x: log(x + 1) if x > 0 else 0)
        for i in np.arange(1, 7):
            df['bill_relamt' + str(i)] = df['bill_amt' +
                                            str(i)] / df['limit_bal']
        df['limit_bal_log'] = df['limit_bal'].apply(lambda x: log(x + 1))
        df['limit_bal_cat'] = pd.cut(
            df['limit_bal'], range(0, int(1e6), 10000), right=False)

        return (df, classes)

    def test_train_matrix(self, df):
        formula = 'target ~ '
        formula += 'C(sex) + C(marriage) +  C(education) + age'
        formula += '+' + '+'.join(self.selcols('pay_'))
        formula += '+' + 'C(age_cat)'
        formula += '+' + 'C(limit_bal_cat) + limit_bal_log'
        formula += '+' + 'pay_avg + pay_std'
        formula += '+' + 'pay_amt_avg_log'
        formula += '+' + '+'.join(self.selcols('pay_relamt'))
        formula += '+' + '+'.join(self.selcols('pay_amt_log'))
        formula += '+' + 'bill_amt_avg_log'
        formula += '+' + '+'.join(self.selcols('bill_relamt'))
        formula += '+' + '+'.join(self.selcols('bill_amt_sign'))
        formula += '+' + '+'.join(self.selcols('bill_amt_log'))

        # print df.shape

        y, X = dmatrices(formula, data=df, return_type='dataframe')
        y = y.iloc[:, 1]
        # print X.shape
        return (X, y)

    def feature_select(self, X, y, test_size, is_predict):
        warnings.simplefilter(action='ignore', category=(
            UserWarning, RuntimeWarning))

        selector = SelectKBest(f_classif, 25)
        selector.fit(X, y)
        top_indices = np.nan_to_num(selector.scores_).argsort()[-25:][::-1]
        scaler = preprocessing.MinMaxScaler()
        scaler.fit(X)
        preprocess = Pipeline([('anova', selector), ('scale', scaler)])
        preprocess.fit(X, y)
        # print X.iloc[[-1]]
        X_prep = preprocess.transform(X)
        X_train, X_test, y_train, y_test = train_test_split(
            X_prep, y, test_size=test_size, random_state=42)
        return (X_train, X_test, y_train, y_test) if not is_predict else X_prep[[-1]]

    def plot_cm(self, y_true, y_pred, classes, title, th=0.5):
        y_pred_labels = (y_pred > th).astype(int)

        cm = confusion_matrix(y_true, y_pred_labels)

        return cm.tolist()

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

    def save_model(self, model):
        uuid_t = uuid.uuid4().hex
        models_dir = os.path.join(self.root_dir, 'temp_models')
        if not os.path.exists(models_dir):
            os.makedirs(models_dir)
        pickle.dump(model, open(models_dir + "/" + self.uuid_t + ".sav", 'wb'))
        return uuid_t


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
