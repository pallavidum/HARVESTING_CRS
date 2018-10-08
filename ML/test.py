from UnivariateAnalysis import UnivariateAnalysis

#uv = UnivariateAnalysis('https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls',['SEX'],['AGE'])

#uv = UnivariateAnalysis('https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls',[],['PAY_AMT1'])

uv = UnivariateAnalysis('https://archive.ics.uci.edu/ml/machine-learning-databases/00350/default of credit card clients.xls')

print(uv.run(1,'LIMIT_BAL','default payment next month'))