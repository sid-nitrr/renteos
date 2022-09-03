


const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi)

const express = require('express');
const app = express();
require('./startup/logging');
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
const p = Promise.reject(new Error('Something failed in promise'));
p.then(() => console.log('Done failure'));



const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening to port ${port}...` ));