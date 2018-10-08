import * as Mongoose from "mongoose";
import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import * as path from 'path';
import xlsx from 'node-xlsx';
import { IMlModel, Numerical, ICropProductionPlain, ICropProduction, IMSPData, CropProductionSchema, IFarmPL } from "../mltask/mltask-model";
import { ObjectID } from "bson";
import { unlink } from "fs";

export default class ProjectController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async checkProjectName(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        this.database.mlModel.count(
            { 
                "models.modelName" : request.query.projectName
            }
        ).then((res: number) => {
            if (res > 0) {
                reply(true).code(200);
            } else {
                reply(false).code(200);
            }
        });
    }

    public async getCropData(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        let urlElements = request.url.path.split('/');
        let state = urlElements[urlElements.length-3].trim().replace('%20','').replace('%20','');
        let district = urlElements[urlElements.length-2].trim().replace('%20','').replace('%20','');
        let crop = urlElements[urlElements.length-1].trim().replace('%20','').replace('%20','');
        await this.database.farmData.find({State:state.toString(),District: district.toString()}).find((err, res: IFarmPL) => {
            if (err) {
                throw err;
            } else {
                   this.database.cropProduction.find({FarmId: Mongoose.Types.ObjectId(res[0]._id),'Crop':crop}).sort({Year:-1}).findOne((err1, res1: ICropProduction)=>{
                    if (err1) {
                        reply(err1).code(200);
                    }
                    else{
                        reply(res1).code(200);
                    }
                });
            }
        });        
    }

    public async getCropDataForGraph(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        let urlElements = request.url.path.split('/');
        let state = urlElements[urlElements.length-3].trim().replace('%20','').replace('%20','');
        let district = urlElements[urlElements.length-2].trim().replace('%20','').replace('%20','');
        let crop = urlElements[urlElements.length-1].trim().replace('%20','').replace('%20','');
        await this.database.farmData.find({State:state.toString(),District: district.toString()}).find((err, res: IFarmPL) => {
            if (err) {
                throw err;
            } else {
                   this.database.cropProduction.find({FarmId: Mongoose.Types.ObjectId(res[0]._id),'Crop':crop}).sort({Year:1}).find((err1, res1: ICropProduction[])=>{
                    if (err1) {
                        reply(err1).code(200);
                    }
                    else{
                        reply(res1).code(200);
                    }
                });
            }
        });        
    }

    public async getNearestMarkets(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        try
        {
        var point = {
            type: "Point",
            coordinates: [ parseFloat(request.query.lng), parseFloat(request.query.lat) ]
        };
        var geoOptions =  {
            spherical: true,
            num: 5,
            distanceMultiplier : 0.001
        };
         await this.database.mspLocation.geoNear(point,geoOptions,function(err, results, stats)
         {
                if(err) throw err;
                reply(results).code(200);
         });
        }
        catch(ex){            
        }
    }

    public async getNearestPostOffices(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        try
        {
        var point = {
            type: "Point",
            coordinates: [ parseFloat(request.query.lng), parseFloat(request.query.lat) ]
        };
        var geoOptions =  {
            spherical: true,
            num: 5,
            distanceMultiplier : 0.001
        };
         await this.database.postalDataLocation.geoNear(point,geoOptions,function(err, results, stats)
         {
                if(err) throw err;
                reply(results).code(200);
         });
        }
        catch(ex){

        }
    }

    public async getMSPData(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        await this.database.mspData.find((err, res: IMSPData[]) => {
            if (err) {
                throw err;
            } else {
                reply(res).code(200);
            }
        });        
    }

    public async getMSPPrice(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        await this.database.mspData.find({"MSPData.district": request.query.district, "MSPData.commodity":request.query.crop}).findOne((err, res: IMSPData) => {
            console.log('Hello');
            console.log(res);
            if (err) {
                throw err;
            } else {
                reply(res).code(200);
            }
        });        
    }

    public async deleteProject(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const excelPath: string = request.payload.excelPath;
            unlink(path.join(__dirname, '../', 'Uploads', excelPath.split('/').pop()), (err) => { });
            this.database.mlModel.findOneAndRemove({ _id: ObjectID.createFromHexString(request.payload.projectId) }, err => {
                if (err) {
                    reply(false).code(200);
                } else {
                    reply(true).code(200);
                }
            });
        } catch (ex) {
        }
    }
}