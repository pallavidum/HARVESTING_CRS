from CreditRisk import CreditRisk
from sklearn import linear_model
from information_value import WOE
import sys
import uuid
import math


class LogisticRegression:
    def __init__(self, url, test_size):
        self.url = url
        self.test_size = test_size

    def run(self, default_column='default payment next month'):
        woe_calc = WOE()

        uuid_t = uuid.uuid4().hex
        cr = CreditRisk(self.url, uuid_t)
        df_o = cr.download_file()
        df, classes = cr.read_file(df_o, uuid_t)
        X, y = cr.test_train_matrix(df)
        X_train, X_test, y_train, y_test = cr.feature_select(
            X, y, self.test_size, False)
        regr = linear_model.LogisticRegression()
        regr.fit(X_train, y_train)
        uuid_t = cr.save_model(regr)
        y_train_pred = regr.predict_proba(X_train)[:, 1]
        y_test_pred = regr.predict_proba(X_test)[:, 1]
        list_attributes = list(df_o)
        # if default_column is not None:
        default_col_index = list_attributes.index(default_column)
        c_nparray = df_o.as_matrix()
        score = []
        woe_dict = {}
        list_attributes.pop()
        for l in list_attributes:
            woe_dict[l] = woe_calc.woe_single_x_score(c_nparray[:, list_attributes.index(l)], c_nparray[:, default_col_index].astype(
                bool))
        for index, row in df_o.iterrows():
            woe_val = 0
            # Assume that As the score points are just another way to denote the scorecard, they do not affect its predictive power.
            # Now, we can assume that 600 score points correspond to odds (bads to goods) of 1:50,
            #  while each additional 20 points double the odds (620 points double the odds to 1:100, 640 score points double to 1:200 etc.).
            startScore = 600
            pdo = 20
            factor = pdo / math.log(2)
            offset = round(startScore - (factor * math.log(50)))
            for l in list_attributes:
                cell_value = df_o.at[index, l]
                col_index = list_attributes.index(l)
                woe_val = woe_val + (woe_dict[l][cell_value] * regr.coef_[0][col_index]) + (
                    regr.intercept_[0] / len(list_attributes))
            score.append(round(offset + woe_val))
        return cr.scores(score, y_train, y_train_pred, y_test,  y_test_pred, classes, uuid_t)
