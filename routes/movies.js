// ../ to go up one folder

const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie');

// router.get('/movies/', (req, res, next) => {
//   console.log('we are in the movies route');
// Movie.find()
// .then(moviesFromDB => {
//   console.log('moviesFromDB', moviesFromDB);
//   res.render('movies/', { moviesList: moviesFromDB});
// })
// .catch(err => {
//   console.log(err)
// })
// });


router.get('/movies', (req, res, next) => {

  Movie.find().populate('cast').then(movies => {
console.log('movies', movies);
    res.render('movies/index', { movies });
  })
  .catch(err => {
    console.log(err);
    });
  });

  router.get('/movies/new', (req, res) => {
    console.log('movies new');
    Celebrity.find().then(celebrities => {
      res.render('movies/new.hbs', { celebrities });
    })
      .catch(err => {
        next(err);
      });
  });

  router.post('/movies', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    console.log(cast);
    Movie.create({ title, genre, plot, cast: cast })
    .then((movieCreated) => {
      res.redirect('/movies')
    })
      .catch(err => {
        res.render('movies/new');
        next(err);
      });
  });

  router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
      // .populate('cast')
      .then(movieFromDB => {
        // console.log(`This is the celebrity selected: ${movieFromDB}`)
        Celebrity.find()
          .then(celebrityFromDB => {
        res.render('movies/edit', {movieSelected: movieFromDB, celebritiesFromDB: celebrityFromDB});
        
          })
          .catch(err => {
            console.log(err);
            next(err);
          })
      })
      .catch((err) => {
        console.log(err)
        next();
      })
  })

  router.get('/movies/show:id', (req, res, next) => {
    console.log(req.params.id);
    const moviesId = req.params.id;
    // get the celebrity with the clicked id
    Movie.findById(MoviesId)
      .then(movieFromDB => {
        console.log(movieFromDB);
        // render the details view
        res.render('movies/show.hbs', { movieDetails: movieFromDB });
      })
      .catch(err => {
        console.log(err);
      })
  });

  router.post('/movies/:id', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
      .catch(err => {
        next(err);
      });
  });
    
 
  

module.exports = router;
