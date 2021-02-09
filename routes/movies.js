const router = require("express").Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie')

router.get('/movies/:id/edit', (req, res) => {
  let movieId = req.params.id
  Movie.findById(movieId)
  .populate('cast')
  .then(movie => {
    res.render('movies/edit', {allMovies: movie})
  })
  .catch(err => {
    console.log(err)
  })
})

// Iteration 12 

// router.get('/movies/:id/edit', (req, res) => {
//   let movieId = req.params.id
//    Movie.findById(movieId)
//    .then(movie => {
//      if (movie === null) {
//        res.render('movies/index')
//      } else {
//       Celebrity.find()
//       .then((movie, celebrities) => {
//         console.log('these are the celebrities: ', celebrities)
//         res.render('movies/edit', {allMovies: movie, allCelebrities : celebrities})
//       })
//      }
//    })
//   .catch(err => {
//     console.log(err)
//   })
// })



router.post('/movies/:id/edit', (req, res) => {
  let editId = req.params.id
  console.log(editId)
  const {title, genre, plot, cast} = req.body;
  Movie.findByIdAndUpdate(editId, {
    title,
    genre,
    plot,
    cast
  })
  .populate('cast')
  .then(() => {
      res.redirect('/movies') 
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/movies', (req, res) => {
  Movie.find()
  .populate('cast')
  .then(movies => {
    res.render('movies/index', { allMovies: movies })
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/movies', (req, res) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast
  })
  .then(movie => {
      console.log('This is the new movie: ', movie)
     res.redirect('/movies')
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/movies/new', (req, res) => {
  Celebrity.find()
  .then(celebrities => {
      // console.log('These are the celebrities: ', celebrities)
      res.render('movies/new', { allCelebrities: celebrities})
    }).catch(err => {
      console.log(err)
    })
  })

module.exports = router;