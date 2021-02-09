const router = require("express").Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find().then(celebritiesFromDB => {
    res.render('celebrities/index', { celebritiesList: celebritiesFromDB })
  }).catch(err => {
    console.log('Error while getting the list of all celebrities from the database: ', err);
    next();
  })
})

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityfromDB => {
    res.render('celebrities/show', { celebrityDetails: celebrityfromDB})
  }).catch(err => {
    console.log('Error while getting the list of all celebrities from the database: ', err);
    next();
  })
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
})

router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body; 

  const newCeleb = new Celebrity({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })

  newCeleb.save().then(celebrity => {
    res.redirect("/celebrities");
  }).catch(err => {
    console.log('Error while saving a new celebrity: ', err);
    res.render('celebrities/new');
  })
})

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id).then(() => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err);
      next();
    })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityfromDB => {
    res.render('celebrities/edit', {celebrity: celebrityfromDB}) 
  }).catch(err => {
    console.log('Error while getting a celebrity by ID: ', err);
    next();
  })
})

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.updateOne({_id: req.params.id}, {name: name, occupation: occupation, catchPhrase: catchPhrase})
  .then(q => {
    res.redirect('/celebrities')
  }).catch(err => {
    console.log('Error while updating a celebrity: ', err);
    next();
  })
})


/* Iteration 8,9: Adding a new movie and Adding actors to the movie cast */
router.get('/movies/new', (req, res, next) => {
  Celebrity.find().then(celebritiesFromDB => {
    res.render('movies/new', { celebrities: celebritiesFromDB });
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/movies', (req, res) => {
  const { title, genre, plot, celebrity } = req.body; 

  const newMovie = new Movie({
    title: title,
    genre: genre,
    plot: plot,
    cast: celebrity
  });

  newMovie.save().then(movie => {
    console.log('Movie successfully saved: ', movie);
    res.redirect("/movies");
  }).catch(err => {
    console.log('Error while saving a new moive: ', err);
  });

})

let populatedMovies = [];

//Iteration 10: Listing all Movies
router.get('/movies', (req, res, next) => {

  Movie.find().populate('cast').then(moviesFromDB => {
        console.log("My array of populated movies: ", moviesFromDB);
        res.render('movies/index', { moviesList: moviesFromDB })
      }).catch(err => {
        console.log('Error while populating the movies: ', err);
      })
})

router.get('/movies/:id/edit', (req, res, next) => {

  Celebrity.find().lean().then(celebritiesFromDB => {
      Movie.findById(req.params.id).populate('cast').then(MoviefromDB => {
        for(let celeb of celebritiesFromDB) {
          celeb.selected = false;
          for(let actor of MoviefromDB.cast) {
            if(actor.name === celeb.name) {
              celeb.selected = true;
            }
          }
        }
        res.render('movies/edit', {movie: MoviefromDB, celebrities: celebritiesFromDB})
      }).catch(err => {
        console.log('Error while getting a movie by ID: ', err);
        next();
      })
    })
    .catch(err => {
      console.log('Error when finding all celebrities: ', err);
    })
})

router.post('/movies/:id', (req, res, next) => {
  const { title, genre, plot, celebrity } = req.body;
  console.log("celebrity :", celebrity);
  Movie.updateOne({_id: req.params.id}, {title: title, genre: genre, plot: plot, cast: celebrity})
   .then(q => {
     console.log("Number of elements modified: ", q.n);
     res.redirect('/movies')
  }).catch(err => {
     console.log('Error while updating a celebrity: ', err);
  })
})

module.exports = router;