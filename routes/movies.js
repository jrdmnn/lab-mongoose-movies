const router = require("express").Router();
const Movie = require('../models/Movie.js');
const Celebrity = require('../models/Celebrity.js');


//Get all movies
router.get('/movies', (req, res) => {
  console.log('router movies');
  Movie.find()
    .populate('cast')
    .then(allMovies => {
      res.render('movies/index', { movies: allMovies })
    })
    .catch(err => {
      console.log(err);
    })
})


// Access add movie form
router.get('/movies/new', (req, res) => {
  Celebrity.find()
    .then(celebrityDb => {
      res.render('movies/new', {celebrities: celebrityDb})
    })
    .catch(err => {
      console.log(err);
    })
})


// Add movie to db
router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log({ title, genre, plot, cast });

  Movie.create({ title, genre, plot, cast })
    .then(movie => {
      console.log(movie, 'was successfully added.');
      res.redirect(`/movies`)
    })
    .catch(err => {
      console.log(err);
      res.render('/movies/new')
    })
})


module.exports = router;