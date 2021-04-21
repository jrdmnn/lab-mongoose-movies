const Celebrity = require('../models/celebrities');
const Movie = require('../models/Movie');
const router = require('express').Router();

router.get('/movies/new', (req, res, next) => {
  Celebrity.find().then(celebritiesFromDb => {
    res.render('movies/new', {
      celebrities: celebritiesFromDb
    })
  }).catch(err => {
    next(err)
  })
})

router.get('/movies', (req, res, next) => {
  Movie.find().populate('cast').then(moviesFromDb => {
    res.render('movies/index', {
      movies: moviesFromDb
    })
  })
})

router.post('/movies', (req, res, next) => {
  const {
    title,
    genre,
    plot,
    cast
  } = req.body
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  }).then(newMovie => {
    res.redirect('/movies')
  })
})

router.post('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  const {
    title,
    genre,
    plot,
    cast
  } = req.body
  Movie.findByIdAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  }).then(c => {
    console.log(c.cast)
    res.redirect('/movies')
  }).catch(err => {
    next(err)
  })
})
router.get('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id
  Movie.findById(movieId).populate('cast').then(movie => {
    console.log(movie)
    res.render('movies/edit', {
      editMovie: movie
    })
  })
})

module.exports = router