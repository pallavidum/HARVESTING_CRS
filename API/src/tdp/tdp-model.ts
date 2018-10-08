import * as MongooseGeo from "mongoose-geojson-schema";
import * as Mongoose from "mongoose";

class GeoJSON{
    type: String;
    coordinates: Number[];
}

class locationModel{
    _id:string;
    lat:string;
    lon:string;
}

export interface IAgIntelPL{
    Latitude:string,
    Longitude:string,
    FieldActivityStatus : number,
    HarvestingDates1 : string,
    HarvestingDates2 : string
}

export interface IBranchDataPL{
    branch:string,
    address:string,
    ifsc : number,
    contact : string,
    bank : string,
    location : GeoJSON
}

export interface IFarmerPL{
     name : string,
     score:string,
     loanType:string,
    // activatedAlerts : number,
     location : locationModel,
     pastHistory:string,
    // creditScore:string,
     amountRequested:string,
     notes:string,
     eligibilityStatus:string,
     agent:string,
    customerName: string,
    data:string,
}

export interface IFarmer extends Mongoose.Document{
    id: Mongoose.Schema.Types.ObjectId,
     name : string,
     score:string,
     loanType:string,
    // activatedAlerts : number,
     location : locationModel,
     pastHistory:string,
    // creditScore:string,
     amountRequested:string,
     notes:string,
     eligibilityStatus:string,
     agent:string,
    customerName: string,
    data:string
}

export interface IAgIntel extends Mongoose.Document{
    Latitude:string,
    Longitude:string,
    FieldActivityStatus : number,
    HarvestingDates1 : string,
    HarvestingDates2 : string
}

export interface IBranchData extends Mongoose.Document{
    branch:string,
    address:string,
    ifsc : number,
    contact : string,
    bank : string,
    location : GeoJSON
}

export const AgIntelSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    Latitude:String,
    Longitude:String,
    FieldActivityStatus : Number,
    HarvestingDates1 : String,
    HarvestingDates2 : String
});

export const BranchDataSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
    branch:String,
    address:String,
    ifsc : String,
    contact : String,
    bank : String,
    location : Object
});

export const FarmerDataSchema = new Mongoose.Schema({
    id: Mongoose.Schema.Types.ObjectId,
     name : String,
     score:String,
     loanType:String,
    // activatedAlerts : number,
     location : Object,
     pastHistory:String,
    // creditScore:string,
     amountRequested:String,
     notes:String,
     eligibilityStatus:String,
     agent:String,
     customerName: String,
    data:String,
});

export const agIntelModel = Mongoose.model<IAgIntel>('AgIntel', AgIntelSchema,'AgIntel');
export const branchDataModel = Mongoose.model<IBranchData>('BranchData', BranchDataSchema,'BranchData');
export const farmerDataModel = Mongoose.model<IFarmer>('FarmerData',FarmerDataSchema,'farmerData');
