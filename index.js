

const config = require('config');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi)

const express = require('express');
const app = express();
require('./startup/logging');
require('./startup/routes')(app)
require('./startup/db')();

const p = Promise.reject(new Error('Something failed in promise'));
p.then(() => console.log('Done failure'));
if(!config.get('jsonPrivateKey')){
    console.error('FATAL ERROR: jwt Private key not defined');
    process.exit(1);
}


const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening to port ${port}...` ));