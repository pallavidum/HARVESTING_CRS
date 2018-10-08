import pandas as pd
import numpy as np
import sys
from CreditRisk import CreditRisk
import random
import json
from information_value import WOE


class UnivariateAnalysis:
    def __init__(self, url, category_list=None, numeric_list=None):
        self.url = url
        if category_list is not None:
            self.category_list = category_list
        if numeric_list is not None:
            self.numeric_list = numeric_list
        

    def run(self, type=None, columnName=None,default_column=None):
        cr = CreditRisk(self.url, "")
        df_train = cr.download_file()
        #df_train = pd.read_excel(filename, header=1)
        list_attributes = list(df_train)
        if default_column is not None:
            default_col_index = list_attributes.index(default_column)
        if type is None:
            cjson_list = []
            njson_list = []
            woe_calc = WOE()
            for l in list_attributes:
                x_vals = []
                y_vals = []
                x_hist = []
                y_hist = []
                if l in self.category_list:
                    df_train[l] = df_train[l].astype('category')
                    d = df_train.groupby([l], as_index=False).size()
                    d_frame = d.to_frame()

                    c_nparray = df_train.as_matrix()

                    for index, row in d_frame.iterrows():
                        x_vals.append(index)
                        y_vals.append(row[0])
                        if len(x_vals) > 200:
                            sample_list = sorted(random.sample(
                                range(0, len(x_vals)), 200))
                        else:
                            sample_list = range(0, len(x_vals))
                    categorical_json = {'feature': l,
                                        'x_vals': [str(x_vals[i]) for i in sample_list],
                                        'y_vals': [str(y_vals[i]) for i in sample_list],
                                        'woe': woe_calc.woe_single_x(c_nparray[:, list_attributes.index(l)], c_nparray[:, default_col_index].astype(bool))
                                        }
                    cjson_list.append(categorical_json)
                elif l in self.numeric_list:
                    df_train[l] = pd.to_numeric(df_train[l], errors='coerce')
                    h = np.histogram(df_train[l], bins='auto', normed = True, density=False)
                    for x in h[1].tolist():
                        x_hist.append(format(float(x), '.2f'))
                    for y in h[0].tolist():
                        y_hist.append(format(float(y), '.0f'))
                    min_val = str(df_train[l].dropna().min())
                    max_val = str(df_train[l].dropna().max())
                    mean_val = str(df_train[l].dropna().mean())
                    median_val = str(df_train[l].dropna().median())
                    mode_val = str(df_train[l].dropna().mode()[0])
                    tot_null = str(df_train[l].isnull().sum())

                    numerical_json = {'feature': l,
                                      'x_hist': x_hist,
                                      'y_hist': y_hist,
                                      'min_val': min_val,
                                      'max_val': max_val,
                                      'mean_val': mean_val,
                                      'median_val': median_val,
                                      'mode_val': mode_val,
                                      'tot_null': tot_null
                                      }
                    njson_list.append(numerical_json)
            json_final = {'categorical': cjson_list, 'numerical': njson_list}
            return json.dumps(json_final)
        else:
            l=columnName
            if type == 0:
                x_vals = []
                y_vals = []
                woe_calc = WOE()
                df_train[l] = df_train[l].astype('category')
                d = df_train.groupby([l], as_index=False).size()
                d_frame = d.to_frame()
                c_nparray = df_train.as_matrix()
                for index, row in d_frame.iterrows():
                    x_vals.append(index)
                    y_vals.append(row[0])
                    if len(x_vals) > 200:
                        sample_list = sorted(random.sample(
                            range(0, len(x_vals)), 200))
                    else:
                        sample_list = range(0, len(x_vals))
                return json.dumps({'feature': l,
                                       'x_vals': [str(x_vals[i]) for i in sample_list],
                                       'y_vals': [str(y_vals[i]) for i in sample_list],
                                       'woe': woe_calc.woe_single_x(c_nparray[:, list_attributes.index(l)], c_nparray[:, 24].astype(bool))
                                       })
            else:
                x_hist = []
                y_hist = []
              #  df_train[l] = pd.to_numeric(df_train[l], errors='coerce')
              #  h = np.histogram(df_train[l], bins='auto', normed = True, density=False)
              #  for x in h[1].tolist():
              #       x_hist.append(format(float(x), '.2f'))
              #  for y in h[0].tolist():
              #       y_hist.append(format(float(y), '.0f'))
                min_val = str(df_train[l].dropna().min())
                max_val = str(df_train[l].dropna().max())
                mean_val = str(df_train[l].dropna().mean())
                median_val = str(df_train[l].dropna().median())
                mode_val = str(df_train[l].dropna().mode()[0])
                tot_null = str(df_train[l].isnull().sum())
                return json.dumps({'feature': l,
                                                  'x_hist':df_train[l].values.tolist(),
                                                  'y_hist': y_hist,
                                                  'min_val': min_val,
                                                  'max_val': max_val,
                                                  'mean_val': mean_val,
                                                  'median_val': median_val,
                                                  'mode_val': mode_val,
                                                  'tot_null': tot_null
                                                  })
