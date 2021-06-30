const express = require('express');

const router = require("express").Router();

const Movie = require('../models/movie');

const Celebrity = require('../models/celebrity')

router.get("/", (req, res, next) => {
  Movie.find().populate('cast')
    .then(moviesFromDB => {
      res.render("movies/index.hbs", { movieList: moviesFromDB });
      //console.log(movieList)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get("/new", (req, res, next) => {
  Celebrity.find()
    .then(celebsDB => {
      res.render('movies/new.hbs', {celebsDB});
    })
    .catch(err => {
      console.log(err)
    })
});

router.post("/", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
      title: title,
      genre: genre,
      plot: plot,
      cast: cast
  })
      .then( () => {
        res.redirect(`/movies`)
      })
      .catch(err => {
        console.log(err);
      })
});

router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/edit', { movie });
      Celebrity.find()
        .then(celebsDB => {
          let options = '';
          let selected = '';
          celebsDB.forEach(actor => {
            selected = movie.cast.map(each => each._id).includes(actor._id) ? 'selected' : '';
            options += `<option value="${actor._id}" ${actor.name}</option>`;
        });
        res.render('movies/edit', {movie, options});
      })
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/:id/', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      console.log(err);
    });
});


module.exports = router;