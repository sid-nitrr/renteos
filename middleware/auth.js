const config = require('config');
const jwt = require('jsonwebtoken');

module.exports= function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token Provided');
    
    try{
        const decodedPayload= jwt.verify(token,config.get('jsonPrivateKey')); //it throws an exception if token is invalid, if token is valid then it will return decoded payload, in our case it is userid
        req.user = decodedPayload;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid Token');
    }
    
}