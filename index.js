const express = require('express');
const app = express();
const genres=require('./routes/genres')

app.use(express.json()); //middle ware
app.use(express.urlencoded({extended:true}));
app.use('/api/genres',genres);

const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening to port ${port}...` ));