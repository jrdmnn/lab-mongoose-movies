const router = require('express').Router();

const Celebrity = require('../models/Celebrity');
const Movie = require("../models/Movie");


///////
router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then(movies => {
    res.render("movies/index", { movies: movies });
    })
    .catch(err => {
    next(err);
    })  
});


///////
router.get('/movies/new', (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('movies/new', { celebrities: celebrities });
    })
    .catch(err => {
    next(err);
    })
})


///////
router.post('/movies', (req, res) => {
  const { title, genre, plot, celebrities } = req.body;  
  Movie.create({
    title,
    genre,
    plot,
    cast: celebrities
  })
  .then(movie => {
    console.log(`This movie was created ${movie}`);
    res.redirect('/movies')
  })
    .catch((err) => {
    res.render('movies/new')
  })
})


///////
router.post("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, celebrities } = req.body;
  Movie.findByIdAndUpdate(movieId, {
    title,
    genre,
    plot,
    cast: celebrities
  })
  .then(() => {
    res.redirect('/movies')
  })
    .catch(err => {
      next(err);
    })
});


///////
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


///////
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