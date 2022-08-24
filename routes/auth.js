const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    //Check if user which is logging in does exist or not.
    let user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Invalid email or password');
    };
    const validPassword = await bcrypt.compare(req.body.password, user.password); //return true or false
    if(!validPassword) return res.status(400).send('Invalid email or password');
    const token = jwt.sign({'_id': user._id}, 'jwtPrivateKey');
    res.send(token);
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    const { error, value } = schema.validate(user);
    return { error, value };

}
module.exports = router;