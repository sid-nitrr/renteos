const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //Check if Customer which is to be added, does already exixt or not.
    let customer = await Customer
                         .find({name: req.body.name});
    if (customer.length>0) {
        return res.status(500).send(`Customer already exist with customer name ${req.body.name}`);
    };

    if(!req.body.isGold){
        req.body.isGold=false
    }
    customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    //1. Check that id exist or not, if not existing return 404
    let customer = await Customer.findById(req.params.id);
                         
    if (!customer) {
        return res.status(404).send(`No customer found with id ${req.params.id}`);
    }
    //2. Check is req having correct schema, if invalid return 400-bad request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //3. Modify the db and return the updated customer details
    customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {new: true});
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    //Look for id exist or not, if not return 404.
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).send(`No Customer found with id ${req.params.id}`);
    }
    //Delete if present
    customer = await Customer.findByIdAndRemove(req.params.id);
    //Return the deleted customer details
    res.status(200).send(`${customer.name} Customer deleted succesfully`);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) res.status(404).send(`No Customer found with id ${req.params.id}`);
    res.send(customer);
});

module.exports = router;