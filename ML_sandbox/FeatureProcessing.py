from CreditRisk import CreditRisk
import numpy as np
import pandas as pd
from operator import itemgetter
import time
import os
import json

# class to preprocess data
class FeatureProcessing:
    def __init__(self, url=None):
        self.url = url

    # returns df where columns are sorted by feature names
    def sort_df_by_feature_names(self, df):
        return df.reindex(sorted(df.columns), axis=1)

    # returns either CATEGORICAL or NUMERICAL given a single feature
    # TODO implement
    def categorize_single_feature(self, col_name):
        print(self.url)
        #print("categorize_single_feature")
        print(col_name)
        filename = self.url.rsplit('/', 1)[-1]
        uuid = os.path.splitext(os.path.basename(filename))[0]
        CR = CreditRisk(self.url, uuid)
        df = CR.download_file()
        features_dict = self.categorize_features(df)
        feature_type = features_dict.get(col_name, "NUMERICAL")
        if feature_type == "NUMERICAL":
            #return json.dumps({'isNumeric': 1})
            return json.dumps({'isNumeric': 1})
        else:
            #return json.dumps({'isNumeric': 0})
            return json.dumps({'isNumeric': 0})

    # categorizes all features from user uploaded data
    # returns json dict where keys are feature names and values are either 0 == categorical or 1 == numerical
    def categorize_all_features(self):
        print(self.url)
        #print("categorize_all_feature")
        filename = self.url.rsplit('/', 1)[-1]
        uuid = os.path.splitext(os.path.basename(filename))[0]
        CR = CreditRisk(self.url, uuid)
        df = CR.download_file()
        features_dict = self.categorize_features_numerical(df)
        return json.dumps(features_dict)

    # returns dict where keys are feature names and values are either 0 == categorical or 1 == numerical
    def categorize_features_numerical(self, df):
        res = {}
        for c in df.columns:
            diff = (df[c].max() - df[c].min())
            sum_min_to_max = (diff*(diff+1))/2
            score = sum_min_to_max / df[c].nunique()
            #print(c, df[c].max(), sum_min_to_max/df[c].nunique())
            if diff > score:
                res[c] = 0  # categorical
            elif diff < score:
                res[c] = 1  # numerical
        return res

    # returns dict where keys are feature names and values are either Categorical or NUMERICAL
    # n(n+1)/2 / unique()
    # TODO probably not needed, use categorize_features_numerical instead
    def categorize_features(self, df):
        res = {}
        for c in df.columns:
            diff = (df[c].max() - df[c].min())
            sum_min_to_max = (diff*(diff+1))/2
            score = sum_min_to_max / df[c].nunique()
            #print(c, df[c].max(), sum_min_to_max/df[c].nunique())
            if diff > score:
                res[c] = 'CATEGORICAL'
            elif diff < score:
                res[c] = 'NUMERICAL'
        return res

    # returns panda series of values' bins
    # TODO integration test
    # TODO add function to CreditRisk to manually compute scores using coarse_classifier()
    def coarse_classifier(self, df, col, ranges=[]):
        if not ranges:
            return "ranges cannot be empty"
        df['bin'] = pd.cut(df[col], ranges)
        return df['bin'].values

    # returns new df where given numerical features are bucketed into equally sized num_bins
    # TODO rewrite this function
    def bin_numerical_features(self, df, cols=[], discrete_threshold=10, num_bins=10):
        df_res = df.copy()
        for col in df.columns.values:
            if df[col].nunique() > discrete_threshold:
                if col.upper() == 'LATITUDE' or col.upper() == 'LONGITUDE':
                    break
                else:
                    factor, bins = pd.cut(df[col], bins=num_bins, retbins=True, labels=range(num_bins))
                    #print(col)
                    #print(bins)
                    result = list(factor)
                    df_res[col] = pd.DataFrame({col: result})
        return df_res

    # normalize features
    # TODO implement
    # TODO not sure if needed
    def normalize_features(self):
        raise NotImplementedError

    # returns index of row in a df that best matches given latitude and longitude
    def find_index_nearest_point(self, lat, long, df_lat, df_long):
        lats = np.asarray(df_lat)
        longs = np.asarray(df_long)
        rel_lats = np.abs(lats - lat)
        rel_longs = np.abs(longs - long)
        rel_position = rel_lats + rel_longs
        idx = (rel_position).argmin()
        return idx

    # returns concatenated df using latitude and longitude as keys
    # TODO may want to use parallel processing to speed up loop in this function
    # TODO or look into using difflib library and pandas.merge()
    def concat_dfs_latlong(self, df, df_to_concat):
        start_time = time.time()
        df_ordered = pd.DataFrame()
        for index, row in df.iterrows():
            user = df.iloc[index]
            idx = self.find_index_nearest_point(user['LATITUDE'], user['LONGITUDE'],
                                                df_to_concat['LATITUDE'], df_to_concat['LONGITUDE'])
            df_ordered = df_ordered.append(df_to_concat.iloc[idx])
            #print(df_to_concat.iloc[idx])
        #df_to_concat.drop(['LATITUDE', 'LONGITUDE'], axis=1, inplace=True)
        df_ordered = df_ordered.reset_index(drop=True)
        df_ordered.drop(['LATITUDE', 'LONGITUDE'], axis=1, inplace=True)
        #print(list(df_ordered))
        df_concat = pd.concat([df, df_ordered], axis=1)

        # TODO should save df_conact to local
        print("concat_dfs_latlong runtime: %s seconds" % (time.time() - start_time))
        return df_concat

    # returns df with missing values filled
    def fill_missing_vals(self, df, feature_types):
        for feat in feature_types:
            feature_name = feat[0]
            feature_type = feat[1]
            if feature_type == 1: # 1 == numerical
                # if >30% missing, drop the feature
                if (df[feature_name].isnull().sum()/len(df[feature_name])) > 0.3:
                    df = df.drop(columns=[feature_name])
                else:
                    continue # fill with mean?
            elif feature_type == 0: # 0 == categorical
                # replace missing with "Missing_Value"
                df = df[feature_name].fillna("Missing_Value")
            else:
                continue
        return df

    # returns name of features that contain "default"
    # TODO rewrite this function
    def target_feature_name(self, col_name, df):
        default_col_name = df.filter(regex=col_name).columns
        return default_col_name

    # returns df with outliers removed
    def remove_numerical_feature_outliers(self, df, feature, within_n_std=3):
        return df[np.abs(df[feature]-df[feature].mean())<=(within_n_std*df[feature].std())]

    # returns number of outliers for given feature in given df
    def get_outliers_count(self, df, feature, within_n_std=3):
        return len(df[np.abs(df[feature]-df[feature].mean())>(within_n_std*df[feature].std())])

    # returns percentage of rows with missing values in given feature in given df
    def get_missing_percent(self, df, feature):
        return (df[feature].isnull().sum()/len(df[feature]))

    # return list of correlation coefficents between given feature and all other features
    def get_corr_coeffs(self, df, feature, corr_threshold=0.4):
        corrs = []
        for col in df.columns:
            if col != feature:
                corr = (df[feature].corr(df[col]))
                if corr > corr_threshold:
                    res = [col, corr]
                    corrs.append(res)
        corrs = sorted(corrs, key=itemgetter(1), reverse=True)
        #print(corrs)
        return corrs

    # returns list of features to remove if they are above corr_threshold
    def list_highly_corr_features(self, df, corr_threshold=0.5):
        corrs = []
        for col_1 in df.columns:
            for col_2 in df.columns:
                if col_1 != col_2:
                    corr = (df[col_1].corr(df[col_2]))
                    if corr > corr_threshold:
                        res = [col_1, col_2, corr]
                        corrs.append(res)
        most_freq_col = [x[0] for x in corrs]
        most_freq_dict = {x:most_freq_col.count(x) for x in most_freq_col}
        most_freq_dict = sorted(most_freq_dict.items(), key=lambda x: (x[1],x[0]), reverse=True)
        most_freq_dict = dict(most_freq_dict)
        corrs = sorted(corrs, key=itemgetter(2), reverse=True)
        corrs = corrs[::2]
        to_remove = []
        #corrs_rebuilt = [] # uncomment corrs_rebuilt lines to verify the function works as intended
        keys = list(most_freq_dict.keys())
        i = 0
        while len(corrs) > 0:
            to_remove.append(keys[i])
            most_freq_dict.pop(keys[i], 0)
            for c in corrs:
                if c[0] in to_remove or c[1] in to_remove:
                    corrs.remove(c)
                    #corrs_rebuilt.append(c)
            i+=1
        #for c in corrs_rebuilt:
        #    print(c)
        return to_remove

    # returns new df after dropping features in given list ignore_features
    def remove_features(self, df, ignore_features=[]):
        if len(ignore_features) == 0:
            return df
        return df.drop(ignore_features, axis=1)

    # perform PCA
    # TODO implement
    def PCA(self, df, corr_threshold=0.8):
        raise NotImplementedError

    # TODO unit test and integrate
    # returns feature distance from harvesting api given latitude and longitude
    def get_feature_distance(self, latitude, longitude):
        URL = "http://api.harvesting.co/FeatureDistance?json_str="
        params = '{"type":"Point","coordinates":[' + str(latitude) + ',' + str(longitude) + ']}'
        req = URL + params
        #print(req)
        response = urllib.request.urlopen(req)
        data = json.load(response)
        #for i in data:
            #print(i)
        #print(data)
        #results = data['value(s)'][0]
        #print(results)
        return data['value(s)'][0]

    # TODO implement
    # returns some crop row data from mongodb
    def get_single_row_crop_data(self):
        # mongo 13.84.178.115:27017/crs-dev -u demouser -p demo123
        B_ADDRESS = '13.84.178.115:27017'
        DB_NAME = 'crs-dev'
        DB_USER = 'demouser'
        DB_PW = 'demo123'
        COLLECTIONS = ['AgIntel', 'BranchData', 'ColdStorage',
            'Farm', 'MSPData', 'MSPDataLocation', 'aiemodels', 'cropProduction',
            'geoDistrict','mlmodels', 'postalData', 'users']
        connection = MongoClient(DB_ADDRESS)
        db = connection[DB_NAME]
        db.authenticate(DB_USER, DB_PW)
        collections = db.list_collection_names()
        #for collect in collections:
            #print(collect)
            #print(db[collect].find_one())
        # TODO query here
        # not sure what to query
        # the function should return a new df row?
        raise NotImplementedError
