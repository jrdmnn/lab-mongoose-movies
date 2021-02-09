const router = require('express').Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

/* GET home page */
router.get('/', async (req, res, next) => {
  const celebrities = await Celebrity.find();
  const movies = await Movie.find();
  res.render('index', { celebrities, movies });
});

module.exports = router;
