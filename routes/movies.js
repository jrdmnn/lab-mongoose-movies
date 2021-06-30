const router = require("express").Router();
const Celebrity = require("../models/celebrity");
// ../ to go up one folder
const Movie = require('../models/Movie');


router.get('/movies', (req, res, next) => {
  Movie.find()
  .populate('cast')
  .then(allMoviesDb =>{
    // console.log(cast)
  res.render('movies/index', {allMovies: allMoviesDb})
  })
  .catch(err => {
    console.log(err)
  })
});


router.get('/movies/new', (req, res, next) => {

  Celebrity.find()
  .then(celebrityFromDB => {

    // render the details view
    res.render('movies/new', { celebrityDetails: celebrityFromDB });
  })
  .catch(err => {
    console.log(err);
  })
});

router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast} = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast
  }) 
  res.redirect('movies')
  
})

router.get('/movies/:id/edit', (req, res, next) => {

  Movie.findById(req.params.id)
  .populate('cast')
  .then(movieFromDB => {

    // render the details view
    res.render('movies/edit', { movieEdit: movieFromDB });
  })
  .catch(err => {
    console.log(err);
  })
});


module.exports = router;
