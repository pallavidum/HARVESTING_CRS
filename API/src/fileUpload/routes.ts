import * as Hapi from "hapi";
import * as Joi from "joi";
import FileUploadController from "./fileUpload-controller";
import { jwtValidator } from "../user/user-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const fileUploadController = new FileUploadController(configs, database);
    server.bind(fileUploadController);

    server.route({
        method: 'GET',
        path: '/getFarmData',
        config: {
            handler: fileUploadController.GetFarmData,
            tags: ['api', 'tasks'],
            description: 'Get task by id.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Task founded.'
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/upload',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 50 * 1024 * 1024,
                timeout : 6 * 60 * 60 * 1000
            },
            handler: fileUploadController.uploadFile,
            tags: ['api', 'tasks'],
            description: 'Get task by id.',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Task founded.'
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        }
    });
}
