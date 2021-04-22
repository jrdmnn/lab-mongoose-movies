const router = require('express').Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', { movies: movies })
    })
    .catch(err => {
      next(err);
    })
})

router.post('/movies', (req, res) => {
  const { title, genre, plot } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then(addedMovie => {
      console.log(`A movie was added: ${addedMovie}`);
      res.redirect(`/movies/${addedMovie._id}`)
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