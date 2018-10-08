import * as Hapi from "hapi";
import * as Joi from "joi";
import MlTaskController from "./mltask-controller";
import { jwtValidator } from "../user/user-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const mlController = new MlTaskController(configs, database);
    server.bind(mlController);
    server.route({
        method: 'POST',
        path: '/ml/{algoName}',
        config: {
            handler: mlController.startML,
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
        path: '/ml/featureinfotyped',
        config: {
            handler: mlController.featureInfoTyped,
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
        path: '/ml/featureinfo',
        config: {
            handler: mlController.featureInfo,
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
        path: '/ml/predict/{guid}',
        config: {
            handler: mlController.predict,
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
        path: '/ml/submit',
        config: {
            handler: mlController.saveModel,
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
        method: 'GET',
        path: '/ml',
        config: {
            handler: mlController.getModels,
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
        method: 'GET',
        path: '/ml/AIEData',
        config: {
            handler: mlController.getAIEData,
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
        method: 'GET',
        path: '/ml/GetLocations',
        config: {
            handler: mlController.getLocationsForMap,
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
        method: 'GET',
        path: '/ml/getFarmerData',
        config: {
            handler: mlController.getFarmerData,
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
        method: 'GET',
        path: '/ml/mspData',
        config: {
            handler: mlController.getMSPData,
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
        path: '/ml/combineuseraie',
        config: {
          handler: mlController.combineUserAie,
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
        path: '/ml/featuretype',
        config: {
            handler: mlController.featureType,
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
