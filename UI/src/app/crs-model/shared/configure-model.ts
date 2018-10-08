
class AIEModel{
    id: string;
    lat: string;
    lon: string;
    distToWater: string;
    distToNextNaturalWater: string;
    distToNextPrimaryHighWay: string;
    distToNextVillage: string;
    distToNextCity: string;
    cropType: string;
    yeildHect: string;
    msp: string;
    farmSize: string;
    estimatedINR: string;
}

class ConfigureModel {
    _id: string;
    projectName?: string;
    dataSets: DataSet[];
    selectedDataSet: string;
    models: Model[];
    isSaved: boolean;
    isLite: boolean;
    predictionColumn: string;
    constructor() {
        this.models = [];
        this.dataSets = [];
        this.isSaved = false;
    }
}

class DataSet {
    csvPath?: string;
    csvOriginalName?: string;
    uploadStatus?: boolean;
    rowCount?: number;
    columns: Column[];
    isSelected: boolean;
    predictionColumn: string;
    constructor() {
        this.uploadStatus = false;
        this.columns = [];
        this.uploadStatus = true;
    }
}

class Model {
    selectedAlgoName?: string;
    selectedAlgoType?: AlgorithmsEnum;
    modelName: string;
    trainingSetRatio?: number;
    testingSetRatio?: number;
    modelId?: string;
    isSaved?: Boolean;
    coloumnsSelected?: string[];
    createdAt?: Date;
    modelResult: MlTaskResult;
    constructor() {
        this.trainingSetRatio = 80;
        this.testingSetRatio = 20;
        this.isSaved = false;
        this.selectedAlgoType = AlgorithmsEnum.LogisticRegression;
        this.selectedAlgoName = AlgorithmsEnum[this.selectedAlgoType];
    }
}
enum AlgorithmsEnum {
    SVM = 0,
    LogisticRegression,
    RandomForest,
    GradientBoostedTrees,
}
class Column {
    name: string;
    isNumeric: boolean;
    isDeleted: boolean;
    defaultValue: string;
    categorical?: Categorical;
    numerical?: Numerical;
    constructor() {
        this.isDeleted = false;
        this.isNumeric = false;
    }
}
class FeatureResponse {
    categorical: Categorical[];
    numerical: Numerical[];
    constructor() {
        this.categorical = [];
        this.numerical = [];
    }
}

class SelectedModel{
    selectedModel : ModelDetail;
}

class Categorical {
    feature: string;
    x_vals: string[];
    y_vals: string[];
    woe: object[];
    constructor() {
        this.x_vals = [];
        this.y_vals = [];
    }
}
class Numerical {
    feature: string;
    x_hist: string[];
    y_hist: string[];
    min_val: string;
    max_val: string;
    mean_val: string;
    median_val: string;
    mode_val: string;
    tot_null: string;
    std_val: string;
    var_val: string;
    high_corrs: object[];
    count_outliers : string;
    percentage_missing : string;
    constructor() {
        this.x_hist = [];
        this.y_hist = [];
    }
}

interface MlTaskResult {
    roc_data: RocData;
    cm_train: [number[]];
    cm_test: [number[]];
    classes: number[];
    uuid_t: string;
    scores: number[];
}

interface RocData {
    fpr_train: number[];
    tpr_train: number[];
    roc_auc_train: number;
    acc_train: number;
    fpr_test: number[];
    tpr_test: number[];
    roc_auc_test: number[];
    acc_test: number[];
    pre_200: number[];
    rec_200: number[];
}

interface ModelDetail{
    dataset : DataSet;
    configModel : Model;
    configureModel : ConfigureModel;
 }

export { ConfigureModel, AlgorithmsEnum, FeatureResponse, Categorical, Numerical, Column, Model, DataSet, MlTaskResult, RocData, AIEModel, ModelDetail, SelectedModel };
