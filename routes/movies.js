const router = require("express").Router();
const Celebrity = require("../models/Celebrity");
const Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
	res.render('movies');
});

router.get('/new', (req, res, next) => {
	Celebrity.find()
  .then(celebrityFromDb => {
    res.render('movies/new', {celebrities: celebrityFromDb});

  })
  .catch(err => {
    console.log(err)
  })
  
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