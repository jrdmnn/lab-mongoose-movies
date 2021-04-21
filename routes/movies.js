const router = require("express").Router();
const Movie = require("../models/Movie");

// Iteration 8

router.get('/new', (req, res, next) => {
  res.render('movies/new.hbs');
  // Get all celebrities and pass them to view
});

router.post('/movies', (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create({title, genre, plot, cast}) // Was iteration #9 bullet 3 referring to here?
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;