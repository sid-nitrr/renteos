const {Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //Check if movie genre which is to be added does already exixt or not.
    let genre = await Genre
                         .find({name: req.body.name});
    if (genre.length>0) {
        return res.status(500).send(`Movie already exist with genre ${req.body.name}`);
    };
    genre = new Genre({
        name: req.body.name
    })
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    //1. Check that id exist or not, if not existing return 404
    let genre = await Genre.findById(req.params.id);
                         
    if (!genre) {
        return res.status(404).send(`No Movie found with id ${req.params.id}`);
    }
    //2. Check is req having correct schema, if invalid return 400-bad request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //3. Modify the db and return the updated course
    genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true});
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    //Look for id exist or not, if not return 404.
    let genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send(`No Genre found with id ${req.params.id}`);
    }
    //Delete if present
    genre = await Genre.findByIdAndRemove(req.params.id);
    //Return the deleted course
    res.status(200).send(`${genre.name} Genre deleted succesfully`);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) res.status(404).send(`No Genre found with id ${req.params.id}`);
    res.send(genre);
});

module.exports = router;