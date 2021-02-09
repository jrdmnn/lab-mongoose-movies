const router = require("express").Router();
const { json } = require("express");
const Celebrity = require("../models/Celebrity");
const Movie = require('../models/Movie');

router.get('/movies', (req, res) => {
  Movie.find()
  .populate('cast')
  .then(moviesFromDB => {
    console.log('the movies are', moviesFromDB)
    res.render('./movies/index', {moviesList: moviesFromDB})
  })
  .catch(err => {
    next();
    console.log(err);
  })
})

router.get('/movies/:id/edit', (req,res) => {
  Movie.findById(req.params.id)
  .populate('cast')
  .then(movieFromDB => {
    console.log(movieFromDB)
    res.render('./movies/edit', {movie: movieFromDB});
  })
  .catch(err => {
    next();
    console.log(err);
  })
})

router.post('/movies/:id/edit', (req,res) => {
  const { title, genre, plot } = req.body;

  Movie.findOneAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot
  })
  .then(movie => {
    res.redirect('/movies');
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/movies/new', (req,res) => {
  Celebrity.find().then(celebritiesFromDB => {
    res.render('./movies/new',{celibrities: celebritiesFromDB});
  })
  .catch(err => {
    next();
    console.log(err);
  })
})

router.post('/movies', (req,res)=> {
  const { title, genre, plot, celebrity } = req.body
  console.log(title, genre, plot, celebrity);
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: celebrity
  })
  .then(movie => {
    console.log('this movie was just added: ', movie);
    res.redirect(`/movies`)
  })
})

router.get('/movies/:id', (req,res) => {
  Movie.findById(req.params.id)
  .then(movieFromDB => {
    console.log(movieFromDB)
    res.render('./movies/show', {movie: movieFromDB})
  })
  .catch(err => {
    console.log(err);
  })
})


module.exports = router;