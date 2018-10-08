## CRS

This is the repository for Harvesting's CRS software.

#### Files
* **API** - controllers for uploading data and routing from frontend to backend
* **ML** - production backend
* **ML_sandbox** - development backend
* **UI** - production frontend
* **UI - Clean** - development frontend

#### Getting Started

Start by cloning this repository to your local machine.

##### To build the CRS application (for development):
* cd inside **API** then run `npm install`
* cd inside **UI - Clean** then run `npm install`
* cd inside **ML_sandbox** then run `pip install -r requirements.txt`
* **ML_sandbox** also requires an install of xgboost (xgb), you can find the instructions [here](https://xgboost.readthedocs.io/en/latest/build.html)

If you do not have `npm` installed please follow instructions [here](https://www.npmjs.com/get-npm)

If you do not have `pip` installed please install Python 3 using instructions [here](https://realpython.com/installing-python/).

##### To start the CRS application (for development):
* cd inside **API** then run `npm start`
* cd inside **ML_sandbox** then run `python app.py`
* cd inside **UI - Clean** then run `npm start`

#### TODO
##### ML
* finish implementing functions inside FeatureProcessing.py to query data from mongodb
* load aie data from mongodb into frontend for aie feature selection
* apply compute_credit_score() to each of the ML classes
* parallelize combining of user uploaded data and aie data (just find a way to speed up matching rows in datasets if possible)
* add routing function to remove outliers and missing values from single feature in app.py
* apply coarse_classifier() to creating scores
* finish implementing various model evaluation functions

##### UI
* create and load various ml model evaluations in frontend model results page
* add option for user to remove outliers and missing values from single feature in feature selection

##### API
* add routing function to remove outliers and missing values from single feature in mltask
