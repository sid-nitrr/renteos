const {User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //Check if user which is to be added does already exixt or not.
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).send(`User already registered with email ${req.body.email}`);
    };
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save();
    res.send(user);
});

module.exports = router;