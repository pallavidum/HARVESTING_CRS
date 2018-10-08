import * as Hapi from "hapi";
import * as Boom from "boom";
import { IPlugin } from "./plugins/interfaces";
import { IServerConfigurations } from "./configurations";
import * as Tasks from "./tasks";
import * as User from "./user";
import * as MlTasks from './mltask';
import * as upload from './fileUpload';
import { IDatabase } from "./database";
import * as path from 'path';
import * as fs from 'fs';
import * as projectController from "./Project";
import * as  flmController from "./flm";
import * as tdpController from "./tdp";


export function init(configs: IServerConfigurations, database: IDatabase): Promise<Hapi.Server> {

    return new Promise<Hapi.Server>(resolve => {
        const port = process.env.PORT || configs.port;
        const server = new Hapi.Server({
            connections: {
                routes: {
                    timeout: {
                        server: false,
                        socket: false,
                    }
                }
            }
        });
        if (process.env.NODE_ENV !== 'prod') {
            server.connection({
                port: port,
                routes: {
                    cors: {
                        origin: ['*'],
                    }
                },
            });
        } else {
            server.connection({
                port: port,
                routes: {
                    cors: {
                        origin: ['*'],
                    }, security: true
                },
                tls: {
                    key: fs.readFileSync('/etc/nginx/ssl/private.key'),
                    cert: fs.readFileSync('/etc/nginx/ssl/public.cer')
                }
            });
        }

        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }

        //  Setup Hapi Plugins
        const plugins: Array<string> = configs.plugins;
        const pluginOptions = {
            database: database,
            serverConfigs: configs
        };

        let pluginPromises = [];

        plugins.forEach((pluginName: string) => {
            var plugin: IPlugin = (require("./plugins/" + pluginName)).default();
            console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
            pluginPromises.push(plugin.register(server, pluginOptions));
        });
        server.register(require('inert'), (err) => {
            if (err) { throw err; }
            server.route({
                method: 'GET',
                path: '/Uploads/{csv*}',
                handler: {
                    directory: {
                        path: path.join(__dirname, 'Uploads'),
                    },
                },
            });
        });
        Promise.all(pluginPromises).then(() => {
            console.log('All plugins registered successfully.');
            console.log('Register Routes');
            projectController.init(server, configs, database);
            Tasks.init(server, configs, database);
            User.init(server, configs, database);
            MlTasks.init(server, configs, database);
            upload.init(server, configs, database);
            flmController.init(server,configs,database);
            tdpController.init(server,configs,database);
            console.log('Routes registered successfully.');
            resolve(server);
        });
    });
}
