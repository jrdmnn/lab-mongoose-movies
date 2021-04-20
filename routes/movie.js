const router = require('express').Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      console.log('/movies', movies);
      res.render('movies', { movies });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log('/movies/new', celebrities);
      res.render('movies/new', { celebrities });
    })
    .catch((err) => {
      next(err);
    });
});
router.post('/movies/new', (req, res, next) => {
  const { title, genre, plot, 'cast[]': cast } = req.body;
  // can also be solved by setting name to cast only in form,
  // but then it is not compatible with other languages
  // this way both features are kept
  Movie.create({
    title,
    genre,
    plot,
    cast,
  })
    .then((movie) => {
      console.log('/movies/new POST', movie);
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then((movie) => {
      console.log('/movies/:id', movie);
      res.render('movies/show', { movie });
    });
});

router.get('/movies/:id/edit', (req, res, next) => {
  Promise.all([
    Movie.findById(req.params.id).then((movie) => movie),
    Celebrity.find().then((celebrities) => celebrities),
  ]).then(([movie, celebrities]) => {
    let celebritiesSelected = celebrities.map((celebrity) => {
      //{...celebrity} does not work here!!!
      let sel = movie.cast.includes(celebrity._id);
      return { _id: celebrity._id, name: celebrity.name, selected: sel };
    });
    console.log('/movies/:id/edit', movie, celebrities);
    console.log('DDDDD', movie.cast);
    console.log('WWWWW', celebritiesSelected);
    res.render('movies/edit', { movie, celebrities: celebritiesSelected });
    //res.render('movies/new');
  });
});

router.post('/movies/:id/edit', (req, res, next) => {
  //const { title, genre, plot, cast } = req.body;
  const { title, genre, plot } = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title,
    genre,
    plot,
  })
    .then((movie) => {
      console.log('/movies/:id/edit POST', movie);
      res.redirect(`/movies/${req.params.id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log('/movies/:id/delete POST', req.params.id);
      res.redirect(`/movies`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
