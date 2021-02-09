const router = require('express').Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get('/movies/new', (req, res) => {
  Celebrity.find()
  .then(allCelebrities => {
    res.render('movies/new', {allCelebrities})
  })
  
});

router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log( title, genre, plot, cast );
  Movie.create({
    title: title, 
    genre: genre, 
    plot: plot, 
    cast: cast
  })
  
      .then(movie =>  res.redirect(`/movies`))
      .catch(error => res.redirect('/movies/new'));
});

router.get('/movies', (req, res) => {
  Movie.find()
  .populate('cast','name')
  .then(allMovies => {
    res.render('movies/index', {allMovies})
  })
});

router.get('/movies/:id/edit', (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => res.render('movies/edit', {movie}))
    .catch(error => console.log(error));
});

router.post('/movies/:id', (req, res) => {
  const { title, genre, plot } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot })
    .then(() => res.redirect(`/movies`))
    .catch(error => console.log(error));
});

module.exports = router; 