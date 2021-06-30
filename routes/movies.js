const router = require("express").Router();
// ../ to go up one folder
const Movie = require('../models/Movie');

router.get('/movies', (req, res, next) => {
	// get all the books	
	Movie.find()
		.then(moviesFromDB => {
			// render a view books
			// console.log(booksFromDB)
			res.render('movies', { moviesList: moviesFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get('/movies/new', (req, res, next) => {
  res.render('movies/new.hbs');
});

router.get('/movies/:id', (req, res, next) => {
	console.log(req.params.id);
	const moviesId = req.params.id;
	// get the celebrity with the clicked id
	Movie.findById(moviesId)
		.then(movieFromDB => {
			console.log(movieFromDB);
			// render the details view
			res.render('movies/show.hbs', { movieDetails: movieFromDB });
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Celebrity.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      res.render('/movies/new.hbs');
      next(err);
    })
});


router.post('/movies/:id/delete', (req, res, next) => {
  Celebrity.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    })
});

router.get('/movies/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(movie => {
      res.render('movies/edit', { movie });
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;