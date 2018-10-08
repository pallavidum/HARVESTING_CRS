import * as guid from 'guid';
import { resolve } from 'url';
import xlsx from 'node-xlsx';
const fs = require('fs');
var isMultiple = false;
var arrayFileName = [];
if(typeof require !== 'undefined') var XLSX = require('xlsx');
//trigger upload process
const uploader = function (file, options) {
    if (!file) {
        throw new Error('no file(s)');
    }

    //delete previous array and status multiple
    arrayFileName.length = 0;
    isMultiple = false;

    if (Array.isArray(file)) { isMultiple = true; }

    //check if the path is not available make one
    if (!fs.existsSync(options.dest)) {
        fs.mkdirSync(options.dest);
    }
    //upload single or array files
    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
};

//multiple files upload
const _filesHandler = (files, options) => {
    if (!files || !Array.isArray(files)) {
        throw new Error('no files');
    }
    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
};

//single file upload
const _fileHandler = function (file, options) {
    if (!file) { throw new Error('no file'); }
    const orignalname = `${guid.create()}.${file.hapi.filename.split('.').pop()}`; //file.hapi.filename;
    const filename = new Date().getMilliseconds();
    const path = `${options.dest}${orignalname}`;
    const fileStream = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });
        file.pipe(fileStream);
        file.on('end', function (err) {
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: orignalname,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`, path,
                size: fs.statSync(path).size,
            };
            if (isMultiple) {
                resolve(fileDetails);
            } else {
                arrayFileName.push(fileDetails);
                resolve(arrayFileName);
            }
        });
    });
};

const fileOpener = function(fileName,options){
    const path = `${options.dest}${fileName}`;
    console.log(path);
    let content = '';
    fs.readFile(path, function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;
        console.log(content); 
    });
    
    // const fileStream = fs.readFile(path);   
    // return new Promise((resolve,reject)=>{
    //     fileName.on('error', function (err) {
    //         reject(err);
    //     });
    // });

};


export {uploader,fileOpener};