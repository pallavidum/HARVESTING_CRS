import * as Hapi from "hapi";
import * as Boom from "boom";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import * as helper from './upload-helper';
import * as path from 'path';
import xlsx from 'node-xlsx';

export default class FileUploadController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    public async GetFarmData(request: Hapi.Request, reply: Hapi.ReplyNoContinue)
    {
        const fileName = request.url.query['fileName'];
        const id = request.url.query['Id'];
        const UPLOAD_PATH = path.join(__dirname, '../', 'Uploads');
        const fileOptions = { dest: `${UPLOAD_PATH}/` };        
        //helper.fileOpener(fileName,fileOptions);
        try{
            const workBook = xlsx.parse(`${UPLOAD_PATH}/${fileName}`);
                    const workBookClone = <Array<any>>Object.assign([], workBook[0].data);       
                    let searchColumn = 0; 
                    for(let i=0;i<workBook[0].data[1].length;i++){
                        
                    }
                    // workBookClone.shift();
                    // workBookClone.shift();
                    //const distinctValues = (arr) => arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
                    workBookClone.forEach((row, index) => {
                        // if (row) {
                        //     console.log(row["ID"]);
                        // }
                        //     const values = new Set(columnValues(workBookClone, index));
                        //     if (values.size > 15) {
                        //         featureTypes[index] = true;
                        //     }
                        // }
                        // if (workBookClone[0].length === index + 1) {
                           

                        // }
                    });
        }
        catch(error){
            return reply(Boom.badImplementation(error));
        }
    }

    public async uploadFile(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const UPLOAD_PATH = path.join(__dirname, '../', 'Uploads');
            const fileOptions = { dest: `${UPLOAD_PATH}/` };
            helper.uploader(request.payload.files, fileOptions).then((res: any) => {
                var fileData: Object[] = [];
                for (var i = 0; i < res.length; i++) {
                    const workBook = xlsx.parse(`${UPLOAD_PATH}/${res[i].originalname}`);
                    const workBookClone = <Array<any>>Object.assign([], workBook[0].data);
                    workBookClone.shift();
                    workBookClone.shift();
                    let featureTypes: Boolean[] = workBookClone[0].map((cell) => {
                        return false;
                    });
                    const columnValues = (arr, index) => arr.map(x => x[index]);
                    const distinctValues = (arr) => arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });                    
                    workBookClone[0].forEach((row, index) => {
                        if (row) {
                            const values = new Set(columnValues(workBookClone, index));
                            if (values.size > 15) {
                                featureTypes[index] = true;
                            }
                        }
                        if (workBookClone[0].length === index + 1) {
                            fileData.push({
                                fileName: res[i].originalname,
                                cols: workBook[0].data[1],
                                rows: workBook[0].data.length,
                                defaultValues: workBook[0].data[10],
                                featureTypes: featureTypes
                            });

                        }
                    });
                }
                let result = {
                    success: true,
                    fileData
                };
                reply(result).code(200);
            });
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }
}