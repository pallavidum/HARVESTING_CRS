import * as MongooseGeo from "mongoose-geojson-schema";
import * as Mongoose from "mongoose";


export interface MlTaskResult {
    roc_data: RocData;
    cm_train: [number[]];
    cm_test: [number[]];
    classes: number[];
}

export interface RocData {
    fpr_train: number[];
    tpr_train: number[];
    roc_auc_train: number;
    acc_train: number;
    fpr_test: number[];
    tpr_test: number[];
    roc_auc_test: number[];
    acc_test: number[];
}



class ConfigureModel {
    constructor() {
        this.uploadStatus = false;
        this.columns = [];
        this.models = [];
        this.dataSets = [];
        this.isSaved = false;
    }
    _id: string;
    projectName?: string;
    dataSets: DataSet[];
    selectedDataSet: string;
    csvPath?: string;
    csvOriginalName?: string;
    uploadStatus?: boolean;
    rowCount?: number;
    columns: Column[];
    models: Model[];
    isSaved: boolean;
    predictionColumn: string;
}

class DataSet {
    constructor() {
        this.uploadStatus = false;
        this.columns = [];
        this.uploadStatus = true;
    }
    csvPath?: string;
    csvOriginalName?: string;
    uploadStatus?: boolean;
    rowCount?: number;
    columns: Column[];
    isSelected: boolean;
    predictionColumn: string;
}

class Model {
    constructor() {
        this.trainingSetRatio = 80;
        this.testingSetRatio = 20;
        this.isSaved = false;
    }
    selectedAlgoName?: string;
    selectedAlgoType?: AlgorithmsEnum;
    modelName?: string;
    trainingSetRatio?: number;
    testingSetRatio?: number;
    modelId: string;
    isSaved: Boolean;
    coloumnsSelected: string[];
    createdAt: Date;
}
enum AlgorithmsEnum {
    SVM = 0,
    LogisticRegression,
    RandomForest,
    GradientBoostedTrees,
}
class Column {
    constructor() {
        this.isDeleted = false;
        this.isNumeric = false;
    }
    name: string;
    isNumeric: boolean;
    isDeleted: boolean;
    defaultValue: string;
}

class FeatureResponse {
    constructor() {
        this.categorical = [];
        this.numerical = [];
    }
    categorical: Categorical[];
    numerical: Numerical[];
}
class Categorical {
    constructor() {
        this.x_vals = [];
        this.y_vals = [];
    }
    feature: string;
    x_vals: string[];
    y_vals: string[];
}
class Numerical {
    constructor() {
        this.x_hist = [];
        this.y_hist = [];
    }
    feature: string;
    x_hist: string[];
    y_hist: string[];
    min_val: number;
    max_val: number;
    tot_null: number;
}

class MSPData{
    timestamp : string;
    state : string;
    district : string; 
    market : string; 
    commodity : string; 
    variety : string; 
    arrival_date : string; 
    min_price  :string;
    max_price : string;
    modal_price : string;
}

class GeoJSON{
     type: String;
     coordinates: Number[];
}

export { ConfigureModel, AlgorithmsEnum, FeatureResponse, Categorical, Numerical, Column, Model, MSPData };

export interface AgIntelDataPL{
    Latitude:string,
    Longitude:string,
    FiedlActivityStatus : number,
    HarvestingDates1 : string,
    HarvestingDates2 : string
}

export interface IPostalDataPL{
    Locality : string,
    OfficeName : string,
    Pincode : number,
    subDistrict : string,
    District : string,
    State : string,
    location : GeoJSON
}

export interface AgIntelData extends Mongoose.Schema{
    Latitude:string,
    Longitude:string,
    FiedlActivityStatus : number,
    HarvestingDates1 : string,
    HarvestingDates2 : string
}

export const AgIntelDataScheme = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    Latitude:String,
    Longitude:String,
    FiedlActivityStatus : Number,
    HarvestingDates1 : String,
    HarvestingDates2 : String
});

export interface IPostalData extends Mongoose.Document{
    Locality : string,
    OfficeName : string,
    Pincode : number,
    subDistrict : string,
    District : string,
    State : string,
    location : GeoJSON
}

export const postalDataSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    Locality : String,
    OfficeName : String,
    Pincode : String,
    subDistrict : String,
    District : String,
    State : String,
    location : Object
});

export interface IMSPLoationPL{
    State : string,
    District : string,
    Market : string,
    location : GeoJSON
}

export interface IMSPLoation extends Mongoose.Document{
    State : string,
    District : string,
    Market : string,
    location : GeoJSON   
}


export const mspLocationSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    State : String,
    District : String,
    Market : String,
    location : Object 
});

export interface IMSPDataPL {
    mspData : MSPData,
    location : GeoJSON
}

export interface IMSPData extends Mongoose.Document{
    mspData : MSPData,
    location : GeoJSON   
}

export const mspDataSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    mspData : Array,
    location : Object
});

export interface IFarmPL {
    _id : Mongoose.Schema.Types.ObjectId;
    State : string;
    District : string;
    subDistrict : string;
}

export interface IFarm extends Mongoose.Document{
    State : string;
    District : string;
    subDistrict : string;
}

export const farmSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    State : String,
    District : String,
    subDistrict : String,
});

export interface ICropProductionPlain {
    FarmId: string;
    Crop: string;
    Year: string;
    Season: string;
    Area: string;
    Production: string;
    Yield: string;
}

export interface ICropProduction extends Mongoose.Document {
    FarmId: Mongoose.Schema.Types.ObjectId;
    Crop: string;
    Year: string;
    Season: string;
    Area: string;
    Production: string;
    Yield: string;
}

export const CropProductionSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    FarmId: Mongoose.Schema.Types.ObjectId,
    Crop: String,
    Year: String,
    Season: String,
    Area: String,
    Production: String,
    Yield: String
});

export interface IMlModelPlain {
    projectName?: string;
    dataSets: DataSet[];
    models: Model[];
    isSaved: Boolean;
    predictionColumn: string;
    selectedDataSet: string;
}

export interface IMlModel extends Mongoose.Document {
    projectName?: string;    
    dataSets: DataSet[];
    models: Model[];
    isSaved: Boolean;
    predictionColumn: string;
    selectedDataSet: string;
}

export const MlModelSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    projectName: String,
    dataSets: Array,
    models: Array,
    isSaved: Boolean,
    predictionColumn: String,
    selectedDataSet: String
});


export interface IAIEModelPL{
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

export interface IAIEModel extends Mongoose.Document{
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
    country: string;
    state: string;
    district: string;
    subDistrict: string;
}

export const AIEModelSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    lat: String,
    lon: String,
    distToWater: String,
    distToNextNaturalWater: String,
    distToNextPrimaryHighWay: String,
    distToNextVillage: String,
    distToNextCity: String,
    cropType: String,
    yeildHect: String,
    msp: String,
    farmSize: String,
    estimatedINR: String,
    country: String,
    state: String,
    district: String,
    subDistrict: String,
});

export const MlModel = Mongoose.model<IMlModel>('MlModel', MlModelSchema);
export const AIEModel = Mongoose.model<IAIEModel>('AIEModel',AIEModelSchema);
export const cropProduction = Mongoose.model<ICropProduction>('CropProduction',CropProductionSchema,'cropProduction');
export const mspData = Mongoose.model<IMSPData>('MSPData',mspDataSchema,'MSPData'); 
export const farmData = Mongoose.model<IFarm>('Farm',farmSchema,'Farm');
export const mspLocationData = Mongoose.model<IMSPLoation>('MSPDataLocation',mspLocationSchema,'MSPDataLocation');
export const postalLocationData = Mongoose.model<IPostalData>('postalData',postalDataSchema,'postalData');

