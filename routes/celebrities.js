const router = require("express").Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find().then(celebritiesFromDB => {
    //console.log(celebritiesFromDB);
    res.render('celebrities/index', { celebritiesList: celebritiesFromDB })
  }).catch(err => {
    console.log('Error while getting the list of all celebrities from the database: ', err);
    next();
  })
})

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityfromDB => {
    //console.log(celebrityfromDB);
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
    // console.log(celebrityfromDB);
    res.render('celebrities/edit', {celebrity: celebrityfromDB}) 
  }).catch(err => {
    console.log('Error while getting a celebrity by ID: ', err);
    next();
  })
})

router.post('/celebrities/:id', (req, res, next) => {
  //use model update
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.updateOne({_id: req.params.id}, {name: name, occupation: occupation, catchPhrase: catchPhrase})
  .then(q => {
    //console.log("Number of elements modified: ", q.n);
    res.redirect('/celebrities')
  }).catch(err => {
    console.log('Error while updating a celebrity: ', err);
    next();
  })
})


/* Add a new movie */
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
  }).catch(err => {
    console.log('Error while saving a new moive: ', err);
  });

})


module.exports = router;