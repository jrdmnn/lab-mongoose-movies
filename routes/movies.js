const router = require('express').Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity')

router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,

  })
    .then(addedMovie => {
      console.log(`A movie was added: ${addedMovie}`);
      res.redirect(`/movies`)
    })
})



router.get('/movies/new', (req, res) => {
  Celebrity.find()
    .then(celeb => {
      console.log(celeb);
      res.render('movies/new', { celebrities: celeb });
    })
    .catch(err => {
      next(err);
    })
})

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', { movies: movies })
    })
    .catch(err => {
      next(err);
    })
})

router.get('/movies/:id/show', (req, res, next) => {

  const movieId = req.params.id;

  Movie.findById(movieId).populate('cast').then(movie => {


    res.render('movies/show', { movieDetails: movie });
  })
    .catch(err => {
      next(err);
    })
})

router.get('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then(movie => {
      res.render('movies/edit', { edit: movie });
    })
});

router.post('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;
  console.log(req.body)
  Movie.findByIdAndUpdate(movieId, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
    .then(movie => {
      res.redirect(`/movies`)
    })
    .catch(err => {
      next(err);
    })
})



module.exports = router;