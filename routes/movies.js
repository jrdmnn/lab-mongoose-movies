const router = require('express').Router();
const Celebrity = require("../models/Celebrity");
const Movie = require('../models/Movie');


router.get('/movies', (req, res, next) => {
  Movie.find()
  .populate('cast')
   .then(movies => {
     res.render('movies/index', {moviesList: movies})
   })
   .catch(err => {
    next(err);
  })
})

router.get('/movies/newMovie', (req, res, next) => {
  Celebrity.find()
    .then(celebs => {
      console.log(celebs)
    res.render('movies/newMovie.hbs', {celebrities: celebs})
    })
    .catch(err => {
    next(err);
    })
})


router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast} = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
    .then(movies => {
      console.log(movies)
      res.redirect(`/movies`)
    })
    .catch(err => {
      next(err);
    })
})

module.exports = router;