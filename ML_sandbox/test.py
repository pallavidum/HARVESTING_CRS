from UnivariateAnalysis import UnivariateAnalysis
from LogisticRegression import LogisticRegression
from RandomForest import RandomForest
from GradientBoostedTrees import GradientBoost
from CreditRisk import CreditRisk
from FeatureProcessing import FeatureProcessing
import re
from collections import Counter
import pandas as pd

#uv = UnivariateAnalysis('https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls',['SEX'],['AGE'])

#uv = UnivariateAnalysis('https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls',[],['PAY_AMT1'])

URL = "http://localhost:5000/api/Uploads/a961b410-5eda-cb5f-a73b-2e6dd3aec98e.xlsx"
#uv = UnivariateAnalysis('https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls')
uv = UnivariateAnalysis(URL)
DEFAULT = "default payment next month"
features = ['age', 'children school fee amount paid', 'children school fee pay status',
            'children school fees', 'education', 'electricity bill',
            'electricity bill amount paid', 'electricity bill pay status',
            'equipment rent', 'equipment rent amount paid', 'equipment rent pay status',
            'expenditure', 'id', 'income', 'irrgigation bill amount paid', 'irrigation bill',
            'irrigation pay status', 'land rent pay status', 'limit bal', 'latitude',
            'longitude', 'marriage', 'rent of land', 'rent of land amount paid', 'sex']

#print(uv.combine_user_aie())

for feat in features:
    print(feat)
    #print(uv.run(feat.upper(),DEFAULT.upper()))
    uv.run(feat.upper(),DEFAULT.upper())

#print(features[1].upper())
#print(uv.run(str(features[1]).upper(),DEFAULT.upper()))
#print(uv.run(0,str(features[1]).upper(),DEFAULT))

#model = LogisticRegression(URL, 0.8)
#results = model.run(corr_threshold=0.85)

#model = RandomForest(URL, 0.8)
#results = model.run(corr_threshold=0.85)

model = GradientBoost(URL, 0.8)
#results = model.run(corr_threshold=0.95)
#results = model.run(corr_threshold=0.85)
#results = model.run(corr_threshold=0.75)
#results = model.run(corr_threshold=0.65)
#results = model.run(corr_threshold=0.55)

#print(uv.run(1, "marriage", DEFAULT))
#print(uv.run(0, 'sex', DEFAULT))

#print(uv.run(1,'limit bal','default payment next month'))

#url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls'
#CR = CreditRisk(url, 123)
#FILE = "combined_data_all_numerical.csv"
#df_raw = pd.read_csv(FILE, delimiter='\t')
#result = CR.download_file()
#df_clean, classes = CR.read_file(df_raw, "")
#attributes = list(df_clean.columns.values)
#print(attributes)


#for a in attributes:
    #print(a)
    #print(uv.run(1, a, DEFAULT))

#unique = get_unique_col_names_without_numbers(['ID', 'LIMIT_BAL', 'SEX', 'EDUCATION', 'MARRIAGE', 'AGE', 'PAY_0', 'PAY_2', 'PAY_3', 'PAY_4', 'PAY_5', 'PAY_6', 'BILL_AMT1', 'BILL_AMT2', 'BILL_AMT3', 'BILL_AMT4', 'BILL_AMT5', 'BILL_AMT6', 'PAY_AMT1', 'PAY_AMT2', 'PAY_AMT3', 'PAY_AMT4', 'PAY_AMT5', 'PAY_AMT6', 'default payment next month'])
#print(unique)
#print(unique.keys())
#print(unique.values())


#URL = ""
#CATEGORY_LIST = [] # defaults to None
#NUMERIC_LIST = [] # defaults to None
#UV = UnivariateAnalysis(URL, CATEGORY_LIST, NUMERIC_LIST)

# all default = None
#TYPE = 0
#COL_NAME = ""
#DEFAULT_COL = ""
#result = UV.run(TYPE, COL_NAME, DEFAULT_COL)
