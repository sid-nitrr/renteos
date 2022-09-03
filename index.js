require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const config = require('config');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi)

const express = require('express');
const app = express();
require('./startup/routes')(app)
require('./startup/db')();
winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/renteos',
    level:'error'});

winston.handleExceptions(
    new winston.transports.File({filename: 'uncaughtExceptions.log'})
);

process.on('unhandledRejection', (ex) => {
    //console.log('Uncaught rejection found');
    throw ex;
})
const p = Promise.reject(new Error('Something failed in promise'));
p.then(() => console.log('Done failure'));
if(!config.get('jsonPrivateKey')){
    console.error('FATAL ERROR: jwt Private key not defined');
    process.exit(1);
}


const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening to port ${port}...` ));