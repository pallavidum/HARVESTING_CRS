import * as Hapi from "hapi";
import * as Joi from "joi";
import projectController from "./project-controller";
import { jwtValidator } from "../user/user-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const projectControllerObj = new projectController(configs, database);
    server.bind(projectControllerObj);
    server.route({
        method: 'GET',
        path: '/project/checkProjectName',
        config: {
            handler: projectControllerObj.checkProjectName,
            tags: ['api', 'tasks'],
            description: 'Check if project name already exists',
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
        path: '/project/deleteProject',
        config: {
            handler: projectControllerObj.deleteProject,
            tags: ['api', 'tasks'],
            description: 'Delete existing project',
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
        method: 'GET',
        path: '/project/getCropData/{state}/{district}/{crop}',
        config: {
            handler: projectControllerObj.getCropData,
            tags: ['api', 'tasks'],
            description: 'Get Crop Data Statistics',
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
        method: 'GET',
        path: '/project/getCropDataForGraph/{state}/{district}/{crop}',
        config: {
            handler: projectControllerObj.getCropDataForGraph,
            tags: ['api', 'tasks'],
            description: 'Get Crop Data Statistics',
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
        method: 'GET',
        path: '/project/getMSPData',
        config: {
            handler: projectControllerObj.getMSPData,
            tags: ['api', 'tasks'],
            description: 'Get MSP Data of Market',
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
        method: 'GET',
        path: '/project/getNearestMarkets',
        config: {
            handler: projectControllerObj.getNearestMarkets,
            tags: ['api', 'tasks'],
            description: 'Get Crop Data Statistics',
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
        method: 'GET',
        path: '/project/getNearestPostOffices',
        config: {
            handler: projectControllerObj.getNearestPostOffices,
            tags: ['api', 'tasks'],
            description: 'Get Crop Data Statistics',
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
        method: 'GET',
        path: '/project/getMSPPrice',
        config: {
            handler: projectControllerObj.getMSPPrice,
            tags: ['api', 'tasks'],
            description: 'Get Crop Data Statistics',
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
