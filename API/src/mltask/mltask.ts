import * as path from 'path';
import * as os from 'os';

const ExecPython = (scriptName: string, args: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const PythonShell = require('python-shell');
        let options: any = {
            mode: 'text',
            args: args,
            scriptPath: process.env.NODE_ENV === 'prod' ? path.join(__dirname, '../', '../', 'ML')
                : path.join(__dirname, '../../../../', 'ML'),
        };
        if (os.platform() === 'linux') {
            options.pythonPath = '/usr/bin/python3';
        }
        // const scriptPath = process.env.NODE_ENV === 'prod' ?  path.join( __dirname, '../', '../', 'ML', `${scriptName}.py`)
        //     : path.join(__dirname, '../../../../', 'ML', `${scriptName}.py`);
        // console.log(scriptPath);
        PythonShell.run(`${scriptName}.py`, options,
            (err: any, results: any) => {
                if (err) { reject(err); }
                resolve(results);
            });
    });
};

export { ExecPython };