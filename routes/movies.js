const router = require("express").Router();
const Movie = require('../models/Movie'); 
const Celebrity = require('../models/celebrity');

router.get('/movies/new', (req,res) => {
  Celebrity.find().then(celebrities => {
  res.render('movies/new', {celebrities})
  }).catch(err =>{
    console.log(err); 
  })
})

router.post('/movies/', (req,res) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create({title,genre, plot, cast})
  .then(moviesfromDB => {
    res.redirect(`/movies/${moviesfromDB._id}`)
  })
  .catch(err =>{
    res.redirect('/movies/new')
  });
}); 





module.exports = router 