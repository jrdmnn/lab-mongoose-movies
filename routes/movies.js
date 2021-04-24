const router = require('express').Router();
const Celebrity = require("../models/Celebrity");
const Movie = require('../models/Movie');


router.get('/movies', (req, res, next) => {
  Movie.find()
  .populate('cast')
   .then(movies => {
     res.render('movies/index', { moviesList: movies })
   })
   .catch(err => {
    next(err);
   })
})

router.get('/movies/newMovie', (req, res, next) => {
  Celebrity.find()
    .then(celebs => {
      console.log(celebs)
    res.render('movies/newMovie.hbs', { celebrities: celebs })
    })
    .catch(err => {
    next(err);
    })
})

router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
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

router.get('/movies/edit/:id', (req, res, next) => {
  Movie.findById(req.params.id)
  .populate('cast')
  .then(movie => {
    Celebrity.find()
      .then(celebrities => {
        console.log(celebrities)
        res.render('movies/edit', { movieData: movie, celebrityData: celebrities})
      })
    })
  .catch(err => {
    next(err);
  })
})

router.post('/movies/edit/:id', (req, res, next) => {
  const movieId = req.params.id;
  const {title, genre, plot, cast} = req.body;
  Movie.findByIdAndUpdate(movieId, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
    .then(movie => {
      console.log(`${movie} has been updated succesfully`);
      res.redirect('/movies')
    })
    .catch(err => {
      next(err)
    })
});

module.exports = router;