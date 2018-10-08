import * as Hapi from "hapi";
import * as Joi from "joi";
import FLMController from "./flm-controller";
import { jwtValidator } from "../user/user-validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";

export default function (server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    const flmController = new FLMController(configs, database);
    server.bind(flmController);

    server.route({
        method: 'GET',
        path: '/flm/agIntelData',
        config: {
            handler: flmController.getAgIntelData,
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
        path: '/flm/isNewCustomer',
        config: {
            handler: flmController.iSNewCustomer,
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
        path: '/flm/insertPreferences',
        config: {
            handler: flmController.insertCustomerPreferences,
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
        path: '/flm/getCustomerPreferences',
        config: {
            handler: flmController.getCustomerPreferences,
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
        path: '/flm/scores',
        config: {
            handler: flmController.getScoresForFarmers,
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
        path: '/flm/branchData',
        config: {
            handler: flmController.getBranchLocations,
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
        path: '/flm/farmerData',
        config: {
            handler: flmController.getFarmerData,
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
        path: '/flm/insertFarmerData',
        config: {
            handler: flmController.insertFarmerData,
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
        path: '/flm/insertBulkFarmerData',
        config: {
            handler: flmController.insertFarmerDataBulk,
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
        path: '/flm/InsertLoanOfficer',
        config: {
            handler: flmController.InsertLoanOfficer,
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
        path: '/flm/updateEligibility',
        config: {
            handler: flmController.updateEligibilityStatus,
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
        path: '/flm/getLoanOfficers',
        config: {
            handler: flmController.getLoanOfficers,
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
        path: '/flm/getCustomerColumns',
        config: {
            handler: flmController.GetCustomerColumnData,
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
        path: '/flm/getCustomerMappingModel',
        config: {
            handler: flmController.GetCustomerMappingModel,
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
        path: '/flm/updateLoanOfficer',
        config: {
            handler: flmController.updateLoanOfficer,
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
        path: '/flm/insertMappingData',
        config: {
            handler: flmController.InsertCustomerMappingModel,
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
        path: '/flm/pushMobileSettings',
        config: {
            handler: flmController.PushMobileColumnConfiguration,
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
        path: '/flm/orderValues',
        config: {
            handler: flmController.AlignOrderValue,
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
        path: '/flm/mobileConfiguration',
        config: {
            handler: flmController.GetMobileColumnConfiguration,
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
        path: '/flm/sendFeedbackEmail',
        config: {
            handler: flmController.sendFeedbackEmail,
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
        path: '/flm/getStatus',
        config: {
            handler: flmController.getStatus,
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
        path: '/flm/updateStatus',
        config: {
            handler: flmController.updateStatus,
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
        path: '/flm/addBranch',
        config: {
            handler: flmController.addBranch,
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
        path: '/flm/getBranchByCustomer',
        config: {
            handler: flmController.getBranchByCustomer,
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
