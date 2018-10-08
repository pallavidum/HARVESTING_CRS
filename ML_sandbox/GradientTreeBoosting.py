from CreditRisk import CreditRisk
from FeatureProcessing import FeatureProcessing
from information_value import WOE
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import cross_val_score, KFold
import xgboost as xgb
import sys
import uuid
import math
import pandas as pd
import numpy as np
import os
import time

from imblearn.combine import SMOTETomek # used for balancing the dataset
from collections import Counter

class GradientTreeBoosting:
    def __init__(self, url, test_size, ignore_features=None):
        self.url = url
        self.test_size = test_size
        #TODO should be either list of string or list with index representing position (1 on, 0 off)
        self.ignore_features = ignore_features
        self.model_type = "GRADIENT_TREE_BOOSTING"

    # returns kfold cross validation scores
    def kfold_cv(self, CR, X, y, n_splits=3, shuffle=False, random_state=None):
        scores = []
        kfold = KFold(n_splits=n_splits, shuffle=shuffle, random_state=random_state)
        for train_idx, test_idx in kfold.split(X):
            #print("TRAIN:", train_idx, "TEST:", test_idx)
            X_train, X_test = X[train_idx], X[test_idx]
            y_train, y_test = y[train_idx], y[test_idx]
            model = XGBClassifier(nthread=-1) # -1 to use all cores in system
            model.fit(X_train, y_train)
            scores.append(CR.get_model_accuracy(model, X_test, y_test))
        return scores

    # TODO implement stratified cross validation
    def stratified_cv():
        raise NotImplementedError

    def run(self, default_column='DEFAULT PAYMENT NEXT MONTH', corr_threshold=1.0):
        start_time = time.time()
        # download file from url
        filename = self.url.rsplit('/', 1)[-1]
        uuid = os.path.splitext(os.path.basename(filename))[0]
        print("GradientTreeBoosting.self.url:", self.url)
        CR = CreditRisk(self.url, uuid)
        Processing = FeatureProcessing()

        # check if file exists locally, if not download
        df = CR.read_file()

        df = Processing.sort_df_by_feature_names(df)

        # TODO should save newly created df to server with timestamp and uuid

        #print(list(df))
        print("Number original features: ", len(list(df)))

        df, classes = CR.write_file(df, default_column, uuid)

        # drop ignored features
        if self.ignore_features is not None:
            for feature in self.ignore_features:
                df = df.drop(feature, axis=1)
        #df = CR.bin_numerical_features(df)

        # remove highly correlated features
        features_to_drop = Processing.list_highly_corr_features(df, corr_threshold)
        #print(features_to_drop)
        df = Processing.remove_features(df, features_to_drop)

        # partition
        features = list(df)
        #print(features)
        #print("Number kept features: ", len(list(df)))
        X, y = CR.test_train_matrix(df, default_column)

        # added to balance dataset
        # TODO  may want to check if is needed
        X_resampled, y_resampled = SMOTETomek().fit_sample(X, y)
        print(Counter(y_resampled))
        X_train, X_test, y_train, y_test = CR.split_train_test(
            X_resampled, y_resampled, self.test_size, False, len(features))

        model = XGBClassifier(nthread=-1) # -1 to use all cores in system
        model.fit(X_train, y_train)

        # TODO this function creates data for predicting from original dataset
        # uncomment to see prediction results on original dataset
        X_train, X_test, y_train, y_test = CR.split_train_test(
            X, y, self.test_size, False, len(features))

        # TODO also want to predict probabilites on unsampled data
        # will want to return predictions on unsampled data so we return exact number of instances we started with
        y_train_pred = model.predict_proba(X_train)[:, 1] # 1 = yes default, 0 = no default?
        y_test_pred = model.predict_proba(X_test)[:, 1]

        print("gradient boosted trees accuracy: " + str(CR.get_model_accuracy(model, X_test, y_test)))

        # CV
        #print("kfolds cv: " + str(kfold_cv(CR, X, y)))

        uuid_t = CR.save_model(model)

        # TODO the following is the native implementation of xgboost
        # may not be needed
        '''
        dtrain = xgb.DMatrix(X_train, label=y_train)
        dtest = xgb.DMatrix(X_test, label=y_test)
        num_round = 5
        evallist = [(dtest, 'eval'), (dtrain, 'train')]
        param = {'objective': 'binary:logistic',
                 'silent': 1, 'eval_metric': ['error', 'logloss']}
        bst = xgb.train(param, dtrain, num_round, evallist)

        # save model
        #uuid_t = uuid.uuid4().hex
        uuid_t = CR.save_model(bst)

        # get probability estimates
        y_train_pred = bst.predict(dtrain)
        y_test_pred = bst.predict(dtest)'''

        # get target col index
        if default_column is not None:
            default_col_index = features.index(default_column)

        #kfolds_cv_score = self.kfold_cv(CR, X.as_matrix(), y.as_matrix())
        #print(kfolds_cv_score)

        c_nparray = df.as_matrix()
        #df_o = filename
        score = []
        woe_dict = {}
        features.pop()

        woe = WOE()
        for feat in features:
            woe_dict[feat] = woe.woe_single_x_score(c_nparray[:, features.index(feat)], c_nparray[:, default_col_index].astype(
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
                woe_val = woe_val + woe_dict[l][cell_value]
            score.append(round(offset + woe_val))
            #print('Rows:: ', index,'Score:: ',score[index])

        print("total xgb: %s seconds" % (time.time() - start_time))

        return CR.scores(score, y_train, y_train_pred,
                         y_test, y_test_pred, classes, uuid_t)
