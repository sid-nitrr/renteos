require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres=require('./routes/genres');
const customers=require('./routes/customers')
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/renteos',
    level:'error'});
    
if(!config.get('jsonPrivateKey')){
    console.error('FATAL ERROR: jwt Private key not defined');
    process.exit(1);
}
mongoose.connect('mongodb://localhost/renteos')
.then( () => console.log('Connected to mongodb...'))
.catch((err) => console.error(err.message));

app.use(express.json()); //middle ware
app.use(express.urlencoded({extended:true}));
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);
const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening to port ${port}...` ));