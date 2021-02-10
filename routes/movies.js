const router = require("express").Router();
const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')


//router to /movies; view to a form with POST and action to movies




router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movie) => {
      res.render('./movies/index', { movie });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies', (req, res, next) => {
  Movies.find()
    .then((movie) => {
      res.render('./movies/index', { movie });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies', (req, res, next) => {
  Movies.find()
    .then((movie) => {
      res.render('./movies/index', { movie });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies', (req, res, next) => {
  Movies.find()
    .then((movie) => {
      res.render('./movies/index', { movie });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then((movie) => {
      res.render('./movies/index', { movie });
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/movies/new', (req, res)=>{
  Celebrity.find() 
  .then(celebritiesFromDB => {
    res.render('movies/new', { celebrities: celebritiesFromDB})
  })
  .catch(err => {
    console.log(err)
  })
})
  
router.post('/movies', (req, res) =>{
  const title = req.body.title
  const genre = req.body.genre
  const plot = req.body.plot
  const cast =req.body.cast
  Movie.create({title: title, genre: genre, plot: plot, cast: cast})
  .then(movie=>{
    console.log(movie)
    res.redirect(`/movies`)
  }).catch(err=>console.log(err))
})

//find whole movie array iterate and connect to celebs //iteration10


module.exports = router