const winston = require('winston');

//catches error in request processing pipeline
module.exports = function(err, req, res, next){
    //Log the exception
    winston.error(err.message,err); //log level= error/warn/info/verbose/debug/silly
    res.status(500).send('Something Failed!')
}