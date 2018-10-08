from flask import Flask, request, jsonify
from GradientTreeBoosting import GradientTreeBoosting
from LogisticRegression import LogisticRegression
from RandomForest import RandomForest
from UnivariateAnalysis import UnivariateAnalysis
from Predict import Prediction
from FeatureProcessing import FeatureProcessing
from flask_compress import Compress
import json
import sys

app = Flask(__name__)
Compress(app)


@app.route('/', methods=['GET'])
def test():
    return jsonify({'success': True})

# this function is called when gradient tree boosting is selected in front end
@app.route('/GradientTreeBoosting', methods=['POST'])
def gradientboost():
    req = request.json
    result = GradientTreeBoosting(req['url'], req['test_size']).run()
    #result = GradientTreeBoosting(req['url'], req['test_size'], req['ignore_features']).run()
    #print(result)
    return result

# this function is called when logistic regression is selected in front end
@app.route('/LogisticRegression', methods=['POST'])
def logisticregression():
    req = request.json
    result = LogisticRegression(req['url'], req['test_size']).run()
    #result = LogisticRegression(req['url'], req['test_size'], req['ignore_features']).run()
    return result

# this function is called when random forest is selected in front end
@app.route('/RandomForest', methods=['POST'])
def randomforest():
    req = request.json
    result = RandomForest(req['url'], req['test_size']).run()
    #result = RandomForest(req['url'], req['test_size'], req['ignore_features']).run()
    return result

# called in crsmodel/features (card chart component)
@app.route('/univariateanalysis', methods=['POST'])
def univariateAnalysis():
    req = request.json
    #print(req, file=sys.stderr)
    result = UnivariateAnalysis(req['url']).run(req['columnName'], req['predictionColumn'])
    return result

# called in crsmodel/features (card chart component) when feature type is specified
# 0 == categorical
# 1 == numerical
# ideally we want to use this one so we can perform both categorical and numerical analysis on each feature if needed
@app.route('/univariateanalysis/<string:featureType>', methods=['POST'])
def univariateAnalysisForSingleFeature(featureType):
    req = request.json
    #print(req, file=sys.stderr)
    result = UnivariateAnalysis(req['url']).run(req['columnName'],req['featureType'],req['predictionColumn'])
    return result

# currently called in crsmodel/upload right after data is uploaded
# TODO want a better design in frontend to call this function
# this design should alert frontend when this function is finished and result is returned
@app.route('/combineuseraie', methods=['POST'])
def combineUserAie():
    req = request.json
    #print(req, file=sys.stderr)
    result = UnivariateAnalysis(req['url']).combine_user_aie() #result = {filename, features}
    #print(result, file=sys.stderr)
    return result

# called in crsmodel/upload right after data is uploaded
@app.route('/featuretype', methods=['POST'])
def featureType():
    req = request.json
    #result = FeatureProcessing(req['url']).categorize_single_feature(req['columnName'])
    result = FeatureProcessing(req['url']).categorize_all_features()
    return result

@app.route('/Predict', methods=['POST'])
def predict():
    req = request.json
    result = Prediction(req['input'], req['uuid']).run()
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5123)
