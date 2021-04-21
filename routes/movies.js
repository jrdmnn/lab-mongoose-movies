const router = require("express").Router();
const Movie = require("../models/Movie");
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then(movie => {
    res.render('movies/index', { movies: movie })
  })
})

router.get('/movies/new', (req, res) => {
  Celebrity.find()
    .then(celebrity => {
      res.render('movies/new', { celebrities: celebrity });
    })
    .catch(err => {
      next(err);
    })
})

router.post('/movies', (req, res, next) => {
  const {title, genre, plot, celebrities} = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    celebrities: celebrities
  })
  .then(movie => {
    res.redirect('/movies')
  })
    .catch((err) => {
    res.render('movies/new')
  })
})

router.post('/movies/:id/edit', (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(cast => {
      res.redirect('/movies')
  })
  .catch(err => {
      next(err)
    })
})

router.get('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
  .then((movie) => {
    res.render('movies/edit', { movie: movie })
  })
    .catch(err => {
    next(err)
  })
})

router.post('/movies/:id/delete', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect('/movies')
    })
    .catch(err => {
      next(err)
    })
});

module.exports = router;