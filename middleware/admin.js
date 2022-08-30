const config = require('config');
const jwt = require('jsonwebtoken');

module.exports= function admin(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send('You dont have Admin access');
    next();
}