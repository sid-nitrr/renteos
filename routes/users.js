const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/',  async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //Check if user which is to be added does already exixt or not.
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).send(`User already registered with email ${req.body.email}`);
    };
    user = new User( _.pick(req.body,['name','email','password']) );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send( _.pick(user,['name','email']));
});

module.exports = router;