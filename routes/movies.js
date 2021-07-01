const router = require("express").Router();
const { param } = require(".");
// ../ to go up one folder
const Movies = require('../models/Movie');
const Celebrity = require('../models/Celebrity');


router.get('/movies/index', (req, res, next) => {
	// get all the books	
	Movies.find()
		.then(moviesFromDB => {
			res.render('movies', { movielist: moviesFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});

//router.get('/movies/add', (req, res, next) => {

//	res.render('movies/new');
//	});



router.get('/movies/add', (req, res) => {
	Celebrity.find()
	 .then(celebrities => {
	 res.render('movies/new', { celebrities });
	 		})
	 	.catch(err => {
	 		next(err);
	 		});
	 	});
				

		router.post('/movies', (req, res, next) => {
			// get all the books	
			const {title, genre, plot, cast} = req.body;
			console.log(title, genre, plot, cast)
			Movies.create({
				title: title,
				genre: genre,
				plot: plot,
				cast: cast
			})
				.then(createdMovie => {
					console.log(createdMovie);
					res.redirect(`/movies/index`);
				})
				.catch(err => {
					console.log(err)
				})			
		});

		router.get('/movies/:id', (req, res, next) => {
			// get all the books	
			const movieID = req.params.id;
			Movies.findById(movieID)
				.then(movieFromDB => {
					console.log(movieFromDB)
					res.render('movies/show', { movieDetails: movieFromDB });
				})
				.catch(err => {
					console.log(err)
				})
			});
		
		
	module.exports = router;