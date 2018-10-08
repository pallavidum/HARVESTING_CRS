import * as Hapi from "hapi";
import * as Mongoose from "mongoose";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import { IAgIntel, IBranchData, IFarmer, IFarmerPL } from "./tdp-model";
import * as path from 'path';
import * as os from 'os';
import * as httpclient from 'request';
import { IMlModel } from "../mltask/mltask-model";
import { ObjectID } from "bson";

export default class tdpController {
    private database: IDatabase;
    private configs: IServerConfigurations;
    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async getSingleFarmer(request:Hapi.Request,reply:Hapi.ReplyNoContinue){
        try {
            await this.database.farmerDataModel.findOne({"_id":Mongoose.Types.ObjectId(request.query["Id"])}).find((err, res: IFarmer[]) => {
                
                if (err) {
                    throw err;
                } else {
                    reply(res).code(200);
                }
            });
        } catch (ex) {
            console.log(ex);
            reply({ success: false }).code(500);
        }
    }

    public async getScoresForFarmers(request:Hapi.Request,reply:Hapi.ReplyNoContinue){
        try{
            await this.database.mlModel.find({projectName:"sdlkjl"}).findOne((err, res:IMlModel)=>{
                console.log(res);
                reply(res.models[0]).code(200)
            })
        }
        catch(ex){

        }
    }


    public async getAgIntelData(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            await this.database.agIntelModel.find((err, res: IAgIntel[]) => {
                if (err) {
                    throw err;
                } else {
                    reply(res).code(200);
                }
            });
        } catch (ex) {
            console.log(ex);
            reply({ success: false }).code(500);
        }
    }

    public async getBranchLocations(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            await this.database.branchModel.find((err, res: IBranchData[]) => {
                
                if (err) {
                    throw err;
                } else {
                    reply(res).code(200);
                }
            });
        } catch (ex) {
            console.log(ex);
            reply({ success: false }).code(500);
        }
    }

    public async getFarmerData(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            await this.database.farmerDataModel.find({'customerName':request.query['customerName']}).find((err, res: IFarmer[]) => {
                
                if (err) {
                    throw err;
                } else {
                    reply(res).code(200);
                }
            });
        } catch (ex) {
            console.log(ex);
            reply({ success: false }).code(500);
        }
    }

    public async insertFarmerDataBulk(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {

            let payload = <IFarmer[]>request.payload;
            // payload.activatedAlerts = 0;
            // payload.score = '0';
            // payload.notes='';
            // payload.score='0';
            payload.forEach(element => {
                element.data=JSON.stringify(element);
            });
            let config = this.database.farmerDataModel.insertMany(payload);
            // payload.data = JSON.stringify(payload);
            // // payload.eligibilityStatus = 'Pending';
            // // payload.location={_id:'',lat:'',lon:''};
            // let config = await this.database.farmerDataModel.create(payload);
            if(config){
                return reply(config).code(200)
            }
            else{
                throw "error";
            }
            // await this.database.farmerDataModel.create((err, res) => {
            //     if (err) {
            //         throw err;
            //     } else {
            //         reply(res).code(200);
            //     }
            // });
        } catch (ex) {
            reply({ success: false }).code(500);
        }
    }

    public async insertFarmerData(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {

            let payload = <IFarmer>request.payload;
            // payload.activatedAlerts = 0;
            // payload.score = '0';
            // payload.notes='';
            // payload.score='0';
            payload.data = JSON.stringify(payload);
            // payload.eligibilityStatus = 'Pending';
            // payload.location={_id:'',lat:'',lon:''};
            let config = await this.database.farmerDataModel.create(payload);
            if(config){
                return reply(config).code(200)
            }
            else{
                throw "error";
            }
            // await this.database.farmerDataModel.create((err, res) => {
            //     if (err) {
            //         throw err;
            //     } else {
            //         reply(res).code(200);
            //     }
            // });
        } catch (ex) {
            console.log(ex);
            reply({ success: false }).code(500);
        }
    }
}