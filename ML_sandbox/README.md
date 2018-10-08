# ML_sandbox (CRS Backend)

ML_sandbox is the development version of the ML code for CRS.

#### Files
* **app.py** - supplies routing functions for frontend to call
* **Predict.py** - loads locally saved ml models and makes predictions on new data
* **LogisticRegression.py** - class to create logistic regression model with evaluation functions
* **RandomForest.py** - class to create random forest model with evaluation functions
* **GradientBoostedTrees.py** - class to create gradient boosting trees model with evaluation functions
* **information_value.py** - class to calculate information value (iv) and weight of evidence (woe)
* **CreditRisk.py** - class for creating credit scores, writing/reading models, downloading user uploaded data, partitioning data for model validation, getting auc roc plot values
* **FeatureProcessing.py** - class for processing data
* **test.py** - for testing

### Getting Started

You will need Python 3 to run ML_sandbox. Please follow this [guide](https://realpython.com/installing-python/) if you are unsure how to install Python 3.

You will also need to install dependencies. On command line, cd inside ML_sandbox and run `pip install -r requirements.txt`.

Note that you may need to install xgb separately.

###### Installing xgb

Here is the [installation guide](https://xgboost.readthedocs.io/en/latest/build.html).

Note that on OSX you will need to install gcc and make it your default compiler prior to cloning and building xgb.

### How to run ML_sandbox

To run, on command line cd inside ML_sandbox and run `python app.py`. This will set ML_sandbox server to start listening on port 5123. You can change the port from app.py, but I suggest you do not.

### TODO
* functions are marked with TODO tags and description to indicate work needed
* need to implement categorize_single_feature() in FeatureProcessing.py with routing function in app.py so frontend can call and get result of whether a feature is categorical or numerical
* need to parallelize combine_user_aie() in UnivariateAnalysis.py to reduce runtime
* need to implement evaluation functions in LogisticRegression.py, RandomForest.py, GradientBoostedTrees.py
