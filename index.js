const express = require('express');
const Joi = require('joi'); // J caps in Joi bcs it contains class.
const app = express();

app.use(express.json()); //middle ware
const genres= [
      {genre:'Horror'},
      {genre:'Action'},
      {genre:'Drama'},

];


//no multiple if blocks which we got in http create server.
app.get('/api/genres',(req,res) =>{
res.send(genres);
});

app.get('/api/genres/:genre',(req,res)=>{
const genre=genres.find(c => c.genre===req.params.genre);
if(!genre) res.status(404).send(`No Movie found with genre ${req.params.genre}`);
res.send(genre);
});

app.post('/api/genres',(req,res) =>{
    const { error,value } = validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    // console.log("error  = ",error);
    // console.log("value = ", value);
    // console.log("req.body  = ",req.body);
    const genre = {
       genre:req.body.genre
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:genre',(req,res)=>{
  //1. Check that genre exist or not, if not existing return 404
  const genr=genres.find(c => c.genre===req.params.genre);
  if(!genr){
    return res.status(404).send(`No Movie found with genre ${req.params.genre}`);
  } 
  //2. Check is req having correct schema, if invalid return 400-bad request
  const {error, value} = validateGenre(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }
  //3. Modify the db and return the updated course
   genr.genre = req.body.genre;
   res.send(genr);
});

app.delete('/api/genres/:genre', (req,res)=>{
     //Look for course exist or not, if not return 404.
     const genr=genres.find(c => c.genre===req.params.genre);
  if(!genr){
    return res.status(404).send(`No Movie found with id ${req.params.genre}`);
  }
     //Delete if present
      genres.splice(genres.indexOf(genr),1);
     //Return the deleted course
     res.status(200).send(`${genr.genre} Genre deleted succesfully`);
});

function validateGenre(genre){
    const schema = Joi.object({
        genre: Joi.string().required()
  });
  const {error, value}= schema.validate(genre);
  return {error, value};

}

const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening to port ${port}...` ));