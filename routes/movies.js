const router = require('express').Router();
const Movies = require('../models/Movies');
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res) => {
  Movies.find()
    .populate('cast')
    .then(movies => {
    console.log(`my CURRENT log: `, movies)
    res.render('movies/index.hbs', {moviesList: movies})
  })
});

router.get('/movies/new', (req, res) => {
  Celebrity.find().then(allCelebrities => {
    res.render('movies/new', {allCelebrities: allCelebrities})
  })
});

router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body; 
  Movies.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
    .then(movie => {
      res.redirect('/movies')
    })
});

module.exports = router;
