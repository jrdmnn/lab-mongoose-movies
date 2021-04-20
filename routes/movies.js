const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// MOVIES LIST
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render('movies/indexMovies', { movies });
  } catch (err) {
    next(err);
  }
})

// POST NEW MOVIE
router.post('/', async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.redirect('/movies');
  } catch (err) {
    next(err);
  }
});

// NEW MOVIE FORM
router.get('/new', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('movies/newMovie', { celebrities });
  } catch (err) {
    next(err);
  }
});

// MOVIE DETAILS
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast');
    res.render('movies/showMovie', { movie });
  } catch (err) {
    next(err);
  }
})

// MOVIE EDIT
router.get('/:id/edit', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    const celebrities = await Celebrity.find();

    // celebrities that are part of the cast of the current movie
    const celebsInMovie = celebrities.filter(celeb => movie.cast.includes(celeb._id))
    // we filter out the celebrities that are already in the movie's cast
    const restOfCelebs = celebrities.filter(celeb => !movie.cast.includes(celeb._id));

    res.render('movies/editMovie', { movie, celebsInMovie, restOfCelebs });
  } catch (err) {
    next(err);
  }
})

router.post('/:id/edit', async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/movies/${req.params.id}`);
  } catch (err) {
    next(err);
  }
})

// MOVIE DELETE
router.get('/:id/delete', async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect('/movies');
  } catch (err) {
    next(err);
  }
})



module.exports = router;