const router = require('express').Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res, next) => {
  res.render('movies/');
});

router.get('/movies/new', (req, res, next) => {
  res.render('movies/new');
});

router.get('/movies/:id', (req, res, next) => {
  res.render('movies/show');
});

router.get('/movies/:id/edit', (req, res, next) => {
  res.render('movies/edit');
});

router.get('/movies/:id/delete', (req, res, next) => {
  // just action
});

module.exports = router;
