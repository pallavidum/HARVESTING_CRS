import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import { MlTaskResult, ConfigureModel, IMlModel, IAIEModel, IMlModelPlain, IAIEModelPL, IMSPDataPL } from "./mltask-model";
import * as path from 'path';
import * as os from 'os';
import { ExecPython } from './mltask';
import * as httpclient from 'request';

export default class MlTaskController {
    private database: IDatabase;
    private configs: IServerConfigurations;
    private isJson = (res: string): boolean => {
        try {
            if (JSON.parse(res)) {
                return true;
            }
        } catch (ex) {
            return false;
        }
    }
    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }
    public async predict(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const uuid = request.params.guid;
            const postData = {
                input: JSON.stringify(request.payload),
                uuid: uuid,
            };
            const url = `${this.configs.mlUrl}Predict`;
            const options = {
                method: 'post',
                body: postData,
                json: true,
                url: url
            };
            httpclient(options, function (err, res, body) {
                if (err) {
                    reply().code(500);
                    throw err;
                }
                reply({ prediction: body }).code(200);
            });
        } catch (e) {
            reply().code(500);
        }
    }

    public async featureType(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const dataUrl = request.payload.url;
        const postData = {
            url: dataUrl
        };
        const url = `${this.configs.mlUrl}featuretype`;
        //console.log(url);
        //console.log(dataUrl);
        //console.log(columnName);
        const options = {
            method: 'post',
            body: postData,
            json: true,
            url: url
        };
        httpclient(options, function (err, res, body) {
            if (err) {
                reply().code(500);
                throw err;
            }
            reply(body).code(200);
        });
    }

    public async combineUserAie(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
      try {
          const dataUrl = request.payload.url;
          const postData = {
              url: dataUrl
          };
          const url  = `${this.configs.mlUrl}combineuseraie`;
          const options = {
              method: 'post',
              body: postData,
              json: true,
              url: url
          };
          httpclient(options, function (err, res, body) {
            if (err) {
                reply().code(500);
                throw err;
            }
            reply(body).code(200);
          });
      } catch (ex) {
          reply(ex).code(501);
      }
    }

/*
    public async featureInfo(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const csvPath = request.payload.url;
            const featureType = request.payload.type;
            const columnName = request.payload.columnName.toUpperCase();
            const postData = {
                url: csvPath,
                columnName: columnName,
                featureType: featureType
                predictionColumn: request.payload.predictionColumn.toUpperCase();
            };
            //const url = `${this.configs.mlUrl}univariateanalysis`;
            const url = `${this.configs.mlUrl}univariateanalysis/${featureType}`;
            //console.log(url)
            const options = {
                method: 'post',
                body: postData,
                json: true,
                url: url
            };
            httpclient(options, function (err, res, body) {
                if (err) {
                    //console.log(err);
                    reply().code(500);
                    throw err;
                }
                reply(body).code(200);
            });
        } catch (ex) {
            reply(ex).code(501);
        }
    }
    */
    public async featureInfo(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const dataUrl = request.payload.url;
        const columnName = request.payload.columnName.toUpperCase();
        const defaultColName = request.payload.predictionColumn.toUpperCase();
        const postData = {
            url: dataUrl,
            columnName: columnName,
            predictionColumn: defaultColName,
        };
        const url = `${this.configs.mlUrl}univariateanalysis`;
        //console.log(url);
        //console.log(dataUrl);
        //console.log(columnName);
        const options = {
            method: 'post',
            body: postData,
            json: true,
            url: url
        };
        httpclient(options, function (err, res, body) {
            if (err) {
                reply().code(500);
                throw err;
            }
            reply(body).code(200);
        });
    }
    public async featureInfoTyped(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const dataUrl = request.payload.url;
        const featureType = request.payload.featureType;
        const columnName = request.payload.columnName.toUpperCase();
        const defaultColName = request.payload.predictionColumn.toUpperCase();
        const postData = {
            url: dataUrl,
            featureType: featureType,
            columnName: columnName,
            predictionColumn: defaultColName,
        };
        const url = `${this.configs.mlUrl}univariateanalysis/${featureType}`;
        //console.log(url);
        //console.log(dataUrl);
        //console.log(columnName);
        const options = {
            method: 'post',
            body: postData,
            json: true,
            url: url
        };
        httpclient(options, function (err, res, body) {
            if (err) {
                reply().code(500);
                throw err;
            }
            reply(body).code(200);
        });
    }
    /*
    public async featuresInfo(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        let categoryColumns: string[] = [];
        let numericalColumns: string[] = [];
        const requestPayload = <ConfigureModel>request.payload;
        requestPayload.columns.pop();
        requestPayload.columns.forEach((item) => {
            if (item.isNumeric && !item.isDeleted) {
                numericalColumns.push(item.name);
            } else if (!item.isDeleted) {
                categoryColumns.push(item.name);
            }
        });
        const postData = {
            url: request.payload.csvPath,
            category_list: `[${categoryColumns.toString()}]`,
            numeric_list: `[${numericalColumns.toString()}]`,
        };
        const url = `${this.configs.mlUrl}univariateanalysis`;
        const options = {
            method: 'post',
            body: postData,
            json: true,
            url: url
        };
        httpclient(options, function (err, res, body) {
            if (err) {
                reply().code(500);
                throw err;
            }
            reply(body).code(200);
        });
    }
    */
    public async startML(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const requestPayload = <ConfigureModel>request.payload;
        const algoName = request.params.algoName;
        const postData = {
            url: request.payload.csvPath,
            test_size: request.payload.testingSetRatio / 100
        };
        const url = `${this.configs.mlUrl}${algoName}`;
        const options = {
            method: 'post',
            body: postData,
            json: true,
            url: url
        };
        httpclient(options, function (err, res, body) {
            console.log(res);
            console.log(body);
            if (err) {
                reply().code(500);
            } else {
                reply(body).code(200);
            }
        });
    }
    public async saveModel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const payLoad = <ConfigureModel>request.payload;
            let config;
            if (payLoad.isSaved === false) {
                payLoad.isSaved = true;
                payLoad.models[0].createdAt = new Date();
                config = await this.database.mlModel.create(payLoad);
            } else {
                let model = payLoad.models.pop();
                model.createdAt = new Date();
                config = await this.database.mlModel.update({ _id: payLoad._id },
                    { $push: { models: model } });
            }
            if (config) {
                reply({ success: true, id: config._id }).code(201);
            }
        } catch (ex) {
            reply({ success: false }).code(500);
        }
    }
    public async getModels(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            await this.database.mlModel.find((err, res: IMlModel[]) => {
                if (err) {
                    throw err;
                } else {
                    res.sort(function(obj1, obj2) {
                        var date1 = new Date(obj1.models[0].createdAt), date2 = new Date(obj2.models[0].createdAt);
                        if (date1 > date2) return -1;
                        if (date1 < date2) return 1;
                        return 0;
                    });
                    reply(res).code(200);
                }
            });
        } catch (ex) {
            reply({ success: false }).code(500);
        }
    }

    public async getLocationsForMap(request:Hapi.Request, reply: Hapi.ReplyNoContinue){
        try{
            await this.database.aieModel.find({'state':'Maharashtra','district':'Solapur'}).select({"lat":1,"lon":1}).find((err, res: IAIEModelPL[]) => {
                if (err) {
                    throw err;
                } else {
                    reply(res).code(200);
                }
            });
        }
        catch(ex){
            reply(ex).code(500);
        }
    }

    public async getFarmerData(request:Hapi.Request, reply: Hapi.ReplyNoContinue){
        try{
            await this.database.aieModel.find({ID:request.url.query['id'].toString()}).find((err, res: IAIEModelPL[]) => {
                if (err) {
                    throw err;
                } else {
                    reply(res[0]).code(200);
                }
            });
        }
        catch(ex){}
    }

    public async getMSPData(request:Hapi.Request, reply: Hapi.ReplyNoContinue){
        try {
            await this.database.mspData.find((err, res: IMSPDataPL[]) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log(res);
                }
            }
            );
        }
        catch(ex)
        {
            console.log(ex);
        }
    }

    public async getAIEData(request:Hapi.Request, reply: Hapi.ReplyNoContinue){
        try {
            await this.database.aieModel.find((err, res: IAIEModelPL[]) => {
                console.log(res);
                if (err) {
                    throw err;
                } else {
                    var data: Object[] = [];
                    const columnValues = (arr, index) => arr.map(x => x[index]);
                    const distinctValues = (arr) => arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
                    const cols =[
                        'distToWater',
                        'distToNextNaturalWater',
                        'distToNextPrimaryHighWay',
                        'distToNextVillage',
                        'distToNextCity']
                    for(const columnName of cols){
                        if (columnName) {
                            const allValues = columnValues(res, columnName);
                            const values = new Set(allValues);
                            let obj = {data:[],isNumeric:true,name: columnName};
                            if (values.size < 15) {
                                obj.isNumeric = true;
                            }
                            obj.data = allValues;
                            data.push(obj);
                        }
                    }
                    //reply(data).code(200);
                    reply().code(200);
                }
            });
        } catch (ex) {
            reply({ success: false }).code(500);
        }
    }
}
