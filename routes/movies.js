const express = require("express")
const router = express.Router()
const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')

router.get("/movies", (req, res) => {
  Movie.find().then(moviesFDB => {
    //console.log(celebsFDB)
    res.render('movies/index.hbs', {moviesFDB})
  })
});

router.get('/movies/new', (req, res) => {
Celebrity.find().then(celebsFDB => {
  //console.log('FUCKTHIS', celebsFDB)
  res.render('movies/new.hbs', {celebList : celebsFDB})
  })
});

router.post('/movies', (req, res) => {
  console.log('BODY', req.body)
  const {name, genre, plot, cast} = req.body;
  Movie.create({
    name,
    genre,
    plot,
    cast,
  }) 
  .then(() => {
    res.redirect(`/movies`)
  
})
.catch(err => console.log(err))
})


module.exports = router;