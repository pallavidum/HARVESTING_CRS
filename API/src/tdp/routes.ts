import * as Hapi from "hapi";
import * as Joi from "joi";
import TDPController from "./tdp-controller";
import { jwtValidator } from "../user/user-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const tdpController = new TDPController(configs, database);
    server.bind(tdpController);
    server.route({
        method: 'GET',
        path: '/tdp/getSingleFarmer',
        config: {
            handler: tdpController.getSingleFarmer,
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
