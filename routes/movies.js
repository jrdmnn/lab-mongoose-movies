const router = require("express").Router();
const Celebrity = require("../models/Celebrity");
const {
  findById
} = require("../models/Movie");
const Movie = require("../models/Movie");

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then(celebsInDb => {
      res.render('movies/new', {
        celebrities: celebsInDb
      });
    })
    .catch(err => {
      next(err);
    })
})

router.get('/movies/:id', (req, res, next) => {
  const filmId = req.params.id;
  console.log('this is the ID: ' + filmId);
  Movie.findById(filmId).populate('cast')
    .then(movie => {
      console.log('ITS WORKING THIS FAR' + movie.cast)
      res.render('movies/show', {
        movieInfo: movie
      })
    })
    .catch(err=>{
      next(err)
    })
})

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', {
        movieList: movies
      });
    })
    .catch(err => {
      next(err);
    })
})

router.post('/movies/', (req, res, next) => {
  const {
    title,
    genre,
    plot,
    cast
  } = req.body;
  Movie.create({
      title: title,
      genre: genre,
      plot: plot,
      cast: cast
    })
    .then(() => res.redirect('/movies'))
    .catch(err => {
      console.log(err);
      res.redirect('/movies/new');
    });
})

module.exports = router;