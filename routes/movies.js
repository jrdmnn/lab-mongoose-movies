const router = require("express").Router();
const Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
	res.render('movies');
});

router.get('/new', (req, res, next) => {
	res.render('movies/new');
});

router.post('/', (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast
  })
  res.redirect('movies')
})








module.exports = router;