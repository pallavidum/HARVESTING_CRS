from flask import Flask, request, jsonify
from GradientBoostedTrees import GradientBoost
from LogisticRegression import LogisticRegression
from RandomForest import RandomForest
from UnivariateAnalysis import UnivariateAnalysis
from Predict import Prediction
from flask_compress import Compress
import json

app = Flask(__name__)
Compress(app)


@app.route('/', methods=['GET'])
def test():
    return jsonify({'success': True})


@app.route('/GradientBoostedTrees', methods=['POST'])
def gradientboost():
    req = request.json
    result = GradientBoost(req['url'], req['test_size']).run()
    return result


@app.route('/LogisticRegression', methods=['POST'])
def logisticregression():
    req = request.json
    result = LogisticRegression(req['url'], req['test_size']).run()
    return result


@app.route('/RandomForest', methods=['POST'])
def randomforest():
    req = request.json
    result = RandomForest(req['url'], req['test_size']).run()
    return result

@app.route('/univariateanalysis', methods=['POST'])
def univariateAnalysis():
    req = request.json
    result = UnivariateAnalysis(req['url'], req['category_list'], req['numeric_list']).run()
    return result

@app.route('/univariateanalysis/<int:featureType>', methods=['POST'])
def univariateAnalysisForSingleFeature(featureType):
    req = request.json
    result = UnivariateAnalysis(req['url']).run(featureType,req['columnName'],req['predictionColumn'])
    return result


@app.route('/Predict', methods=['POST'])
def predict():
    req = request.json
    result = Prediction(req['input'], req['uuid']).run()
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5123)
