import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./configurations";
import { IUser, UserModel } from "./user/user";
import { ITask, TaskModel } from "./tasks/task";
import {
  IMlModel,
  MlModel,
  IAIEModel,
  AIEModel,
  cropProduction,
  ICropProduction,
  IMSPData,
  mspData,
  IFarm,
  farmData,
  IMSPLoation,
  mspLocationData,
  IPostalData,
  postalLocationData
} from "./mltask/mltask-model";
import {
  IAgIntel,
  agIntelModel,
  IBranchData,
  branchDataModel,
  IFarmer,
  farmerDataModel,
  ICustomerPreferences,
  customerPreferenceModel,
  ILoanOfficer,
  loanOfficerModel,
  IMobColConfig,
  mobColConfigModel,
  ICustomerDataMapping,
  customerDataMapping,
  IProcessPreferences,
  customerProcessPreferenceModel,
  IBranch,
  customerBranchModel
} from "./flm/flm-model";

export interface IDatabase {
  userModel: Mongoose.Model<IUser>;
  taskModel: Mongoose.Model<ITask>;
  mlModel: Mongoose.Model<IMlModel>;
  aieModel: Mongoose.Model<IAIEModel>;
  cropProduction: Mongoose.Model<ICropProduction>;
  mspData: Mongoose.Model<IMSPData>;
  farmData: Mongoose.Model<IFarm>;
  mspLocation: Mongoose.Model<IMSPLoation>;
  postalDataLocation: Mongoose.Model<IPostalData>;
  agIntelModel: Mongoose.Model<IAgIntel>;
  branchModel: Mongoose.Model<IBranchData>;
  customerBranchModel: Mongoose.Model<IBranch>;
  farmerDataModel: Mongoose.Model<IFarmer>;
  customerPreferencesModel: Mongoose.Model<ICustomerPreferences>;
  loanOfficersModel: Mongoose.Model<ILoanOfficer>;
  mobColConfigModel: Mongoose.Model<IMobColConfig>;
  customerDataMappingModel: Mongoose.Model<ICustomerDataMapping>;
  customerProcessPreferencesModel: Mongoose.Model<IProcessPreferences>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;
  Mongoose.connect(process.env.MONGO_URL || config.connectionString);

  let mongoDb = Mongoose.connection;

  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  mongoDb.once("open", () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  return {
    taskModel: TaskModel,
    userModel: UserModel,
    mlModel: MlModel,
    aieModel: AIEModel,
    cropProduction: cropProduction,
    mspData: mspData,
    farmData: farmData,
    mspLocation: mspLocationData,
    postalDataLocation: postalLocationData,
    agIntelModel: agIntelModel,
    branchModel: branchDataModel,
    farmerDataModel: farmerDataModel,
    customerPreferencesModel: customerPreferenceModel,
    loanOfficersModel: loanOfficerModel,
    mobColConfigModel: mobColConfigModel,
    customerDataMappingModel: customerDataMapping,
    customerProcessPreferencesModel: customerProcessPreferenceModel,
    customerBranchModel: customerBranchModel
  };
}
