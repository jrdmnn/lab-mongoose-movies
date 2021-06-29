const express = require('express');
const router = require("express").Router();

const Movie = require('../models/movie');

router.get("/", (req, res, next) => {
  Movie.find()
    .then(moviesFromDB => {
      res.render("movies/index.hbs", { movieList: moviesFromDB });
      //console.log(movieList)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get("/new", (req, res, next) => {
  res.render('movies/new.hbs');
});

router.post("/", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  //console.log(name, occupation, catchPhrase);
  Movie.create({
      title: title,
      genre: genre,
      plot: plot,
      cast: cast
  })
      .then(newMovie => {
        res.redirect(`/movies`)
      })
      .catch(err => {
        console.log(err);
      })
});


module.exports = router;