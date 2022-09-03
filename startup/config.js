const config = require('config');
module.exports = function(){
    if(!config.get('jsonPrivateKey')){
        throw new Error('FATAL ERROR: jwt Private key not defined');
    }
}