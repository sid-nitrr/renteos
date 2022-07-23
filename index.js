const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres=require('./routes/genres');
const customers=require('./routes/customers')

mongoose.connect('mongodb://localhost/renteos')
.then( () => console.log('Connected to mongodb...'))
.catch((err) => console.error(err.message));

app.use(express.json()); //middle ware
app.use(express.urlencoded({extended:true}));
app.use('/api/genres',genres);
app.use('/api/customers',customers);

const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening to port ${port}...` ));