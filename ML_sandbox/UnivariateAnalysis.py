from CreditRisk import CreditRisk
from FeatureProcessing import FeatureProcessing
from information_value import WOE
import pandas as pd
import numpy as np
import sys
import random
import json
import os
from pathlib import Path

# class for performing analysis
class UnivariateAnalysis:

    # TODO what is the form category_list and numeric_list will be passed into the constructor?
    # is it just a lists with l names?
    # TODO need to change params of init and also in app.py
    def __init__(self, url):
        self.url = url

    # combines user uploaded data with aie data
    # aie data currently is expected to be in form of xls file which is stored locally
    def combine_user_aie(self, default_col="DEFAULT PAYMENT NEXT MONTH"):
        print("inside combine_user_aie")
        filename = self.url.rsplit('/', 1)[-1]
        uuid = os.path.splitext(os.path.basename(filename))[0]
        CR = CreditRisk(self.url, uuid)
        Processing = FeatureProcessing()
        df_user = CR.download_file()

        filename = uuid

        if "LATITUDE" and "LONGITUDE" in df_user.columns:
            # TODO add aie filename as param
            # TODO check if aie filename exists already
            print("combining user and aie data")
            df_aie = CR.read_aie_file("aie_data.xlsx", default_col)
            df_user = Processing.concat_dfs_latlong(df_user, df_aie)
            filename = uuid + "-aie"
            cd = os.path.dirname(os.path.abspath(__file__))
            df_user.to_csv(cd + "/user_aie_datasets/" + filename, encoding='utf-8', index=False)

        return json.dumps({'filename': filename,
                    'features': list(df_user.columns.values)})

    # performs univariate analysis on single feature
    # feature_type == 0 for categorical and == 1 for numerical
    def run(self, col_name, feature_type=-1, default_col="DEFAULT PAYMENT NEXT MONTH"):
        filename = self.url.rsplit('/', 1)[-1]
        uuid = os.path.splitext(os.path.basename(filename))[0]
        #print("UV.url:", self.url)
        #print("UV.uuid:", uuid)
        CR = CreditRisk(self.url, uuid)
        Processing = FeatureProcessing()

        cd = os.path.dirname(os.path.abspath(__file__))
        filename = cd + "/user_aie_datasets/" + uuid + "-aie"
        filepath = Path(filename)
        if filepath.is_file():
            df_user = pd.read_csv(filename, encoding='utf-8')
        else:
            df_user = CR.download_file()
            filename = cd + "/user_datasets/" + uuid
            cd = os.path.dirname(os.path.abspath(__file__))
            df_user.to_csv(filename, encoding='utf-8', index=False)

        df_user = Processing.sort_df_by_feature_names(df_user)
        df, classes = CR.write_file(df_user, default_col, uuid)
        #df_binned = Processing.bin_numerical_features(df) # uncomment to get df where numerical features are binned

        df.columns = df.columns.str.upper()
        features = list(df.columns.values)
        #print(features)
        num_features = len(features) - 1

        if default_col is not None:
            default_col_index = features.index(default_col)

        if feature_type == -1:
            features_dict = Processing.categorize_features_numerical(df)
            feature_type = features_dict.get(col_name, 0)

        #print(feature_type)
        if feature_type == 0:
            x_vals = []
            y_vals = []
            woe = WOE()
            df[col_name] = df[col_name].astype('category')
            df_grouped = df.groupby([col_name], as_index=False).size()
            df_ = df_grouped.to_frame()
            category_nparray = df.as_matrix()
            for idx, row in df_.iterrows():
                x_vals.append(idx)
                y_vals.append(row[0])
                if len(x_vals) > 200:
                    sample_list = sorted(random.sample(
                        range(0, len(x_vals)), 200))
                else:
                    sample_list = range(0, len(x_vals))
            return json.dumps({'feature': col_name,
                                'x_vals': [str(x_vals[i]) for i in sample_list],
                                'y_vals': [str(y_vals[i]) for i in sample_list],
                                #'woe': woe.woe_single_x(category_nparray[:, features.index(col_name)],
                                #                    category_nparray[:, num_features].astype(bool))
                                'woe' : woe.woe_single_x_score(category_nparray[:, features.index(col_name)],
                                            category_nparray[:, features.index(default_col)].astype(bool)),
                                'feature_type': feature_type
                                })
        elif feature_type == 1:
            woe = WOE()
            category_nparray = df.as_matrix()
            x_hist = []
            y_hist = []
            min_val = str(df[col_name].dropna().min())
            max_val = str(df[col_name].dropna().max())
            mean_val = str(df[col_name].dropna().mean())
            median_val = str(df[col_name].dropna().median())
            mode_val = str(df[col_name].dropna().mode()[0])
            tot_null = str(df[col_name].isnull().sum())
            std_val = str(df[col_name].dropna().std())
            var_val = str(df[col_name].dropna().var())
            high_corrs = str(Processing.get_corr_coeffs(df, col_name))
            count_outliers = str(Processing.get_outliers_count(df, col_name))
            percentage_missing = str(Processing.get_missing_percent(df, col_name))
            #_, iv = woe.woe_single_x(category_nparray[:, features.index(col_name)], category_nparray[:, num_features].astype(bool))
            _, iv = woe.woe_single_continuous_feature(df[[col_name, default_col]], col_name, default_col)
            #_, iv = woe.woe_single_x(category_nparray[:, features.index(col_name)], category_nparray[:, features.index(default_col)].astype(bool))
            #print(col_name, " numerical iv:", iv)
            return json.dumps({'feature': col_name,
                                'x_hist': df[col_name].values.tolist(),
                                'y_hist': y_hist,
                                'min_val': min_val,
                                'max_val': max_val,
                                'mean_val': mean_val,
                                'median_val': median_val,
                                'mode_val': mode_val,
                                'tot_null': tot_null,
                                'std_val': std_val,
                                'var_val': var_val,
                                'high_corrs': high_corrs,
                                'count_outliers' : count_outliers,
                                'percentage_missing' : percentage_missing,
                                'iv': iv,
                                'feature_type': feature_type
                            })
