import * as Mongoose from "mongoose";
import { stringLiteral } from "babel-types";

class GeoJSON {
  type: String;
  coordinates: Number[];
}

export class colData {
  colName: string;
  category: string;
}

export class farmerClientData {
  sheetCol: string;
  value: string;
}

export class emailPreferences {
  action: string;
  emailId: string;
  emailTemplate: string;
}

export class dynamicFarmerData {
  customerName: string;
  farmerData: farmerClientData[];
  branchId: string;
}

export class farmerMappingModel {
  customerName: string;
  data: colData[];
}

export class farmerClientModel {
  customerName: string;
}

export class MobileColumnData {
  name: string;
  type: String;
  category: String;
  isActive: boolean;
}

class locationModel {
  _id: string;
  lat: string;
  lon: string;
}

class customerMappingModel {
  defaultCol: string;
  type: string;
  sheetCol: string;
  category: string;
}

export interface IProcessPreferencesPL {
  customerId: string;
  emailPreferences: emailPreferences[];
  branchId: string;
}

export interface IMobColConfigPL {
  customerName: string;
  mobileConfigData: MobileColumnData[];
  branchId: string;
}

export interface IAgIntelPL {
  Latitude: string;
  Longitude: string;
  FieldActivityStatus: number;
  HarvestingDates1: string;
  HarvestingDates2: string;
}

export interface CustomerPreferencesPL {
  prop: string;
  display: string;
  name: string;
  chartType: string;
  customerName: string;
  branchId: string;
}

export interface IcustomerDataMappingPL {
  customerName: string;
  mappingModel: customerMappingModel[];
  branchId: string;
}

export interface IBranchDataPL {
  branch: string;
  address: string;
  ifsc: number;
  contact: string;
  bank: string;
  location: GeoJSON;
}

export interface IFarmerPL {
  name: string;
  HScore: number;
  latitude: string;
  longitude: string;
  age: string;
  sex: string;
  score: string;
  createdDate : Date;
  modifiedDate: Date;
  loanType: string;
  // activatedAlerts : number,
  location: string;
  pastHistory: string;
  // creditScore:string,
  amountRequested: string;
  notes: string;
  eligibilityStatus: string;
  nationalId: string;
  farmArea: string;
  cropType: string;
  agent: string;
  customerName: string;
  data: string;
  branchId: string;
}

export interface ILoanOfficerPL {
  name: string;
  location: string;
  number: string;
  email: string;
  numberOfCases: string;
  isActive: boolean;
  customerName: string;
  branchId: string;
}

export interface IBranchPL {
  branchName: string;
  customerId: string;
}

export interface IMobColConfig extends Mongoose.Document {
  id: Mongoose.Schema.Types.ObjectId;
  customerName: string;
  mobileConfigData: MobileColumnData[];
  branchId: string;
}

export interface IProcessPreferences extends Mongoose.Document {
  customerId: string;
  emailPreferences: emailPreferences[];
  branchId: string;
}

export interface ICustomerDataMapping extends Mongoose.Document {
  id: Mongoose.Schema.Types.ObjectId;
  customerName: string;
  mappingModel: customerMappingModel[];
  branchId: string;
}

export interface ILoanOfficer extends Mongoose.Document {
  id: Mongoose.Schema.Types.ObjectId;
  name: string;
  number: string;
  location: string;
  email: string;
  numberOfCases: string;
  isActive: boolean;
  customerName: string;
  branchId: string;
}

export interface IFarmer extends Mongoose.Document {
  id: Mongoose.Schema.Types.ObjectId;
  HScore: number;
  age: string;
  sex: string;
  name: string;
  score: string;
  latitude: string;
  longitude: string;
  loanType: string;
  createdDate : Date;
  modifiedDate: Date;
  nationalId: string;
  farmArea: string;
  cropType: string;
  // activatedAlerts : number,
  location: string;
  pastHistory: string;
  // creditScore:string,
  amountRequested: string;
  notes: string;
  eligibilityStatus: string;
  agent: string;
  customerName: string;
  data: string;
  customerId: string;
  branchId: string;
}

export interface ICustomerPreferences extends Mongoose.Document {
  prop: string;
  display: string;
  name: string;
  chartType: string;
  customerName: string;
  branchId: string;
}

export interface IAgIntel extends Mongoose.Document {
  Latitude: string;
  Longitude: string;
  FieldActivityStatus: number;
  HarvestingDates1: string;
  HarvestingDates2: string;
}

export interface IBranchData extends Mongoose.Document {
  branch: string;
  address: string;
  ifsc: number;
  contact: string;
  bank: string;
  location: GeoJSON;
}

export interface IBranch extends Mongoose.Document {
  id: Mongoose.Schema.Types.ObjectId;
  branchName: string;
  customerId: string;
}

export const AgIntelSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  Latitude: String,
  Longitude: String,
  FieldActivityStatus: Number,
  HarvestingDates1: String,
  HarvestingDates2: String
});

export const BranchDataSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  branch: String,
  address: String,
  ifsc: String,
  contact: String,
  bank: String,
  location: Object
});

export const FarmerDataSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  age: String,
  sex: String,
  name: String,
  latitude: String,
  longitude: String,
  score: String,
  loanType: String,
  nationalId: String,
  createdDate : Date,
  modifiedDate: Date,
  HScore: Number,
  farmArea: String,
  cropType: String,
  // activatedAlerts : number,
  location: String,
  pastHistory: String,
  // creditScore:string,
  amountRequested: String,
  notes: String,
  eligibilityStatus: String,
  agent: String,
  customerName: String,
  data: String,
  branchId: String
});

export const CustomerPreferencesSchema = new Mongoose.Schema({
  prop: String,
  display: String,
  name: String,
  chartType: String,
  customerName: String,
  branchId: String
});

export const loanOfficerSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  name: String,
  number: String,
  location: String,
  email: String,
  numberOfCases: String,
  isActive: Boolean,
  customerName: String,
  branchId: String
});

export const MobColConfigSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  customerName: String,
  mobileConfigData: Object,
  branchId: String
});

export const customerDataMappingSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  customerName: String,
  mappingModel: Object,
  branchId: String
});

export const customerProcessPreferencesSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  customerId: String,
  emailPreferences: Object,
  branchId: String
});

export const branchSchema = new Mongoose.Schema({
  id: Mongoose.Schema.Types.ObjectId,
  customerId: String,
  branchName: String
});

export const agIntelModel = Mongoose.model<IAgIntel>(
  "AgIntel",
  AgIntelSchema,
  "AgIntel"
);
export const branchDataModel = Mongoose.model<IBranchData>(
  "BranchData",
  BranchDataSchema,
  "BranchData"
);
export const farmerDataModel = Mongoose.model<IFarmer>(
  "FarmerData",
  FarmerDataSchema,
  "farmerData"
);
export const customerPreferenceModel = Mongoose.model<ICustomerPreferences>(
  "CustomerPreferences",
  CustomerPreferencesSchema,
  "CustomerPreferences"
);
export const loanOfficerModel = Mongoose.model<ILoanOfficer>(
  "loanOfficer",
  loanOfficerSchema,
  "loanOfficer"
);
export const mobColConfigModel = Mongoose.model<IMobColConfig>(
  "mobColConfig",
  MobColConfigSchema,
  "mobColConfig"
);
export const customerDataMapping = Mongoose.model<ICustomerDataMapping>(
  "customerDataMapping",
  customerDataMappingSchema,
  "customerDataMapping"
);
export const customerProcessPreferenceModel = Mongoose.model<IProcessPreferences>(
  "customerProcessPreferences",
  customerProcessPreferencesSchema,
  "customerProcessPreferences"
);
export const customerBranchModel = Mongoose.model<IBranch>(
  "branch",
  branchSchema,
  "Branch"
);
