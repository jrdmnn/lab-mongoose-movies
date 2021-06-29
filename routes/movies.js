const router = require("express").Router();

const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

let celebs;

/* GET home page */
router.get("/movies", (req, res, next) => {

  Movie.find()
    .populate('cast')
		.then(moviesFromDB => {
			//console.log(moviesFromDB);
			res.render('movies/index', { moviesFromDB, title: 'Movies' });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get("/movies/new", (req, res, next) => {
// we need to get all the celebrities and pass them into the view
Celebrity.find()
.then(celebritiesFromDB => {
  res.render('movies/new', { celebrities: celebritiesFromDB, title: 'Add movie' });
})
.catch(err => {
  console.log(err);
})
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
		.then(movie => {
			// console.log(movie)
			res.render(`movies/show`, { movie, title: movie.title });
		})
		.catch(err => {
			console.log(err)
		})
});

router.post("/movies", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast
  })
	.then(movie => {
    console.log(`Success! Added ${movie} to the database`);
    res.redirect('/movies');
	})
	.catch(err => {
		console.log(err);
    res.render('movies/new', { title: 'Add movie' });
	})
});

/// new code starting here:

router.get("/movies/:id/edit", (req, res, next) => {
  Celebrity.find()
  .then(celebrities => {
    celebs = celebrities;
    // console.log('celebs: ' + celebs);
    res.redirect(`/movies/${req.params.id}/edit/celebrities`);
  })
  .catch(err => {
    console.log(err)
  })
});

router.get("/movies/:id/edit/celebrities", (req, res, next) => {
  Movie.findById(req.params.id)
  .then(movie => {
    let celebsInMovie = [];
    let celebsNotInMovie = [];
    for (let celeb of celebs) {
      // console.log('this is a celeb: ' + celeb)
      // console.log('this is the movie cast: ' + movie.cast)
      if (movie.cast.includes(celeb._id)) {
        // console.log(`${celeb.name} IS in this movie`);
        celebsInMovie.push(celeb);
      }
      else {
        // console.log(`${celeb.name} is NOT in this movie`);
        celebsNotInMovie.push(celeb);
      }
    }
    // console.log('celebrities in this movie: ' + celebsInMovie);
    res.render('movies/edit', { movie, celebsInMovie, celebsNotInMovie, title: 'Edit movie' });
  })
  .catch(err => {
    console.log(err)
  })
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
		.then(movie => {
			console.log('Movie deleted');
			res.redirect('/movies');
		})
		.catch(err => {
			console.log(err)
		})
});

router.post("/movies/:id", (req, res, next) => {
  // console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title,
    genre,
    plot,
    cast
  })
	.then(movie => {
    console.log(`Successully edited ${movie}`);
    res.redirect(`/movies/${movie._id}`);
	})
	.catch(err => {
		console.log(err);
	})
});

module.exports = router;