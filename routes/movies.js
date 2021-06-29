const router = require("express").Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res, next) => {
	// get all the movies
	Movie.find()
        .populate('cast')   
		.then(moviesInDB => {
			// render a view books
			console.log(moviesInDB);
			res.render('movies/index', { moviesInDB });
		})
		.catch(err => {
			console.log(err)
		})
});



router.get('/movies/new', (req, res, next) => {
    //res.render('movies/new');
    Celebrity.find()
		.then(castFromDB => {
			console.log(castFromDB);
			res.render('movies/new', { castFromDB });
		})
		.catch(err => {
			console.log(err);
		})
  });

//	router.get("/movies/:id", (req, res, next) => {
//		Movie.findById(req.params.id)
//			.populate('cast')
//			.then(movieInDb => {
				// console.log(movie)
//				res.render(`movies/show`, { movieInDb });
//			})
//			.catch(err => {
//				console.log(err)
//			})
//	});

router.post('/movies', (req, res, next) => {
	// console.log(req.body);
	const { title, genre, plot, cast } = req.body;
	console.log(title, genre, plot, cast);
	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
    cast: cast
	})
		.then(createdMovie => {
			console.log(`This movie has just been added: ${createdMovie}`);
			// res.render('bookDetails', { bookDetails: createdBook });
			// this is how you redirect in express
            console.log(`/movies/${createdMovie._id}`);

			res.redirect(`/movies`);
		})
        .catch(err => {
			res.render('movies/new');
		})
});

// this displays the edit form
router.get('/movies/:id/edit', (req, res, next) => {
	// retrieve the book that should be edited	
	const movieId = req.params.id;
	Movie.findById(movieId)
		.then(moviesInDB => {
			console.log(moviesInDB);
			// render a form with the book details
			res.render('movies/edit', { moviesInDB });
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/movies/:id', (req, res, next) => {
	const movieId = req.params.id;
	const { title, genre, plot, cast} = req.body;
	Movie.findByIdAndUpdate(movieId, {
		title,
		genre,
		plot,
		cast
	})
		.then(() => {
			res.redirect(`/movies`);
		})
		.catch(err => {
			console.log(err);
		})
});

module.exports = router;
