from CreditRisk import CreditRisk
from information_value import WOE
import xgboost as xgb
import sys
import uuid
import math


class GradientBoost:
    def __init__(self, url, test_size):
        self.url = url
        self.test_size = test_size

    def run(self, default_column='default payment next month'):
        woe_calc = WOE()
        uuid_t = uuid.uuid4().hex
        cr = CreditRisk(self.url, uuid_t)
        filename = cr.download_file()
        df, classes = cr.read_file(filename, uuid_t)
        X, y = cr.test_train_matrix(df)
        X_train, X_test, y_train, y_test = cr.feature_select(
            X, y, self.test_size, False)
        dtrain = xgb.DMatrix(X_train, label=y_train)
        dtest = xgb.DMatrix(X_test, label=y_test)
        num_round = 5
        evallist = [(dtest, 'eval'), (dtrain, 'train')]
        param = {'objective': 'binary:logistic',
                 'silent': 1, 'eval_metric': ['error', 'logloss']}
        bst = xgb.train(param, dtrain, num_round, evallist)
        uuid_t = cr.save_model(bst)
        y_train_pred = bst.predict(dtrain)
        y_test_pred = bst.predict(dtest)
        list_attributes = list(filename)
        if default_column is not None:
            default_col_index = list_attributes.index(default_column)
        c_nparray = filename.as_matrix()
        df_o = filename
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
                woe_val = woe_val + woe_dict[l][cell_value]
            score.append(round(offset + woe_val))
            print('Rows:: ', index,'Score:: ',score[index])
        return cr.scores(score, y_train, y_train_pred,
                         y_test, y_test_pred, classes, uuid_t)
