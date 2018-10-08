from CreditRisk import CreditRisk
from FeatureProcessing import FeatureProcessing
from information_value import WOE
from sklearn import linear_model
import sys
import uuid
import math
import pandas as pd
import numpy as np
import itertools
import os


class LogisticRegression:
    def __init__(self, url, test_size, ignore_features=None):
        self.url = url
        self.test_size = test_size
        #TODO should be either list of string or list with index representing position (1 on, 0 off)
        self.ignore_features = ignore_features
        self.model_type = "LOGISTIC_REGRESSION"

    def likelihood_ratio():
        raise NotImplementedError

    def mcfaddens():
        raise NotImplementedError

    def walds():
        raise NotImplementedError


    def run(self, default_column='DEFAULT PAYMENT NEXT MONTH', corr_threshold=1.0):
        # download file from url
        filename = self.url.rsplit('/', 1)[-1]
        uuid = os.path.splitext(os.path.basename(filename))[0]
        print("LogisticRegression.self.url:", self.url)
        CR = CreditRisk(self.url, uuid)
        Processing = FeatureProcessing()

        # check if file exists locally, if not download
        df = CR.read_file()

        df = Processing.sort_df_by_feature_names(df)

        df, classes = CR.write_file(df, default_column, uuid)

        # drop ignored features
        if self.ignore_features is not None:
            for feature in self.ignore_features:
                df = df.drop(feature, axis=1)
        #df = CR.bin_numerical_features(df)  # uncomment if needed

        # remove highly correlated features
        features_to_drop = Processing.list_highly_corr_features(df, corr_threshold)
        #print(features_to_drop)
        df = Processing.remove_features(df, features_to_drop)

        # partition
        features = list(df)
        #print(features)
        X, y = CR.test_train_matrix(df, default_column)
        X_train, X_test, y_train, y_test = CR.split_train_test(
            X, y, self.test_size, False, len(features))

        # create, fit model
        clf = linear_model.LogisticRegression()
        clf.fit(X_train, y_train)

        # save model
        #uuid_t = uuid.uuid4().hex
        uuid_t = CR.save_model(clf)

        # get probability estimates
        y_train_pred = clf.predict_proba(X_train)[:, 1]
        y_test_pred = clf.predict_proba(X_test)[:, 1]

        # get target col index
        if default_column is not None:
            default_col_index = features.index(default_column)

        c_nparray = df.as_matrix()
        score = []
        woe_dict = {}
        features.pop()

        woe = WOE()
        for l in features:
            woe_dict[l] = woe.woe_single_x_score(c_nparray[:, features.index(l)], c_nparray[:, default_col_index].astype(
                bool))
        for index, row in df.iterrows():
            woe_val = 0
            # Assume that As the score points are just another way to denote the scorecard, they do not affect its predictive power.
            # Now, we can assume that 600 score points correspond to odds (bads to goods) of 1:50,
            #  while each additional 20 points double the odds (620 points double the odds to 1:100, 640 score points double to 1:200 etc.).
            startScore = 600
            pdo = 20
            factor = pdo / math.log(2)
            offset = round(startScore - (factor * math.log(50)))
            for l in features:
                cell_value = df.at[index, l]
                col_index = features.index(l)
                #print(l, ":", col_index)
                woe_val = woe_val + (woe_dict[l][cell_value] * clf.coef_[0][col_index]) + (
                    clf.intercept_[0] / len(features))
            score.append(round(offset + woe_val))

        print("logistic regression accuracy: " + str(CR.get_model_accuracy(clf, X_test, y_test)))
        return CR.scores(score, y_train, y_train_pred, y_test,  y_test_pred, classes, uuid_t)
