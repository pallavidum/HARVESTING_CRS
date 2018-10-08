from CreditRisk import CreditRisk
from FeatureProcessing import FeatureProcessing
from information_value import WOE
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel
from sklearn.model_selection import cross_val_score, KFold
from sklearn.model_selection import GridSearchCV
import sys
import uuid
import math
import pandas as pd
from operator import itemgetter
import os

# may want to balance the dataset before fitting to prevent bias

class RandomForest:
    def __init__(self, url, test_size, ignore_features=[]):
        self.url = url
        self.test_size = test_size
        # should be either list of string or list with index representing position (1 on, 0 off)
        self.ignore_features = ignore_features
        self.model_type = "RANDOM_FOREST"

    # TODO implement
    def grid_search(self):
        #scores = cross_val_score(clf, X_test, y_test, cv=5)
        #print(scores)
        #print(scores.mean())
        # TODO grid search of hyperparams
        '''
        for i in range(1, 10):
            n_estimators = i*100
            print("n_estimators:", n_estimators)
            for j in range(2, 10):
                clf = RandomForestClassifier(n_estimators=n_estimators, min_samples_leaf=j)
                print("min_samples_leaf:", i)
                clf.fit(X_train, y_train)
                print("random forest accuracy: " + str(CR.get_model_accuracy(clf, X_test, y_test)))'''
        raise NotImplementedError

    # TODO unit test
    def kfold_cv(self, CR, X, y, n_splits=3, shuffle=False, random_state=None):
        #raise NotImplementedError
        scores = []
        kfold = KFold(n_splits=n_splits, shuffle=shuffle, random_state=random_state)
        for train_idx, test_idx in kfold.split(X):
            #print("TRAIN:", train_idx, "TEST:", test_idx)
            X_train, X_test = X[train_idx], X[test_idx]
            y_train, y_test = y[train_idx], y[test_idx]
            clf = RandomForestClassifier(n_estimators=1000, min_samples_leaf=2)
            clf.fit(X_train, y_train)
            scores.append(CR.get_model_accuracy(clf, X_test, y_test))
        return scores

    # return log loss for random forest (closer to 0 is better)
    # TODO unit test
    def log_loss(self, model, X, y, k_folds=10, seed=42):
        kfold = KFold(n_splits=k_folds, random_state=seed)
        results = cross_val_score(model, X, y, cv=kfold, scoring='neg_log_loss')
        return results.mean(), results.std()

    def run(self, default_column='DEFAULT PAYMENT NEXT MONTH', corr_threshold=1.0):
        # download file from url
        filename = self.url.rsplit('/', 1)[-1]
        uuid = os.path.splitext(os.path.basename(filename))[0]
        print("RandomForest.self.url:", self.url)
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
        #df = CR.bin_numerical_features(df) # uncomment if needed

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
        # TODO need to do grid search to find optimal hyperparams
        clf = RandomForestClassifier(n_estimators=1000, min_samples_leaf=2)
        clf.fit(X_train, y_train)
        print("random forest accuracy: " + str(CR.get_model_accuracy(clf, X_test, y_test)))

        #print("log loss: ", self.log_loss(clf, X_train, y_train))

        # TODO may not need this: get list of most important features
        '''importance = []
        for feature in zip(features, clf.feature_importances_):
            importance.append(feature)
        importance = sorted(importance, key=itemgetter(1), reverse=True) # descending order
        print(importance)'''

        # save model
        #uuid_t = uuid.uuid4().hex
        uuid_t = CR.save_model(clf)

        # get probability estimates
        y_train_pred = clf.predict_proba(X_train)[:, 1]
        y_test_pred = clf.predict_proba(X_test)[:, 1]

        # get target col index
        if default_column is not None:
            default_col_index = features.index(default_column)

        # uncomment to see kfolds score
        #kfolds_cv_score = self.kfold_cv(CR, X.as_matrix(), y.as_matrix())
        #print(kfolds_cv_score)

        c_nparray = df.as_matrix()
        score = []
        woe_dict = {}
        features.pop()

        # TODO make credit scores from probability of default
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
                woe_val = woe_val + \
                    woe_dict[l][cell_value] * math.log(2) / (1 - math.log(2))
            score.append(round(offset + woe_val))
            #print('Rows:: ', index, 'Score:: ', score[index])

        return CR.scores(score, y_train, y_train_pred, y_test, y_test_pred, classes, uuid_t)
