const router = require("express").Router();
const Movie = require('../models/Movie.js');
const Celebrity = require('../models/Celebrity.js');


//Get all movies
router.get('/movies', (req, res) => {
  console.log('router movies');
  Movie.find()
    .then(allMovies => {
      res.render('movies/index', { movies: allMovies })
    })
    .catch(err => {
      console.log(err);
    })
})

// Access ass movie form
router.get('/movies/new', (req, res) => {
  res.render('movies/new')
})


// Add movie to db
router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(movie => {
      console.log(movie, 'was successfully added.');
      res.redirect(`/movies/${movie._id}`)
    })
    .catch(err => {
      console.log(err);
      res.render('/movies/new')
    })
})


module.exports = router;