const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

exports.showCreateCelebrityForm = async (req, res, next) => {
  const celebrities = await Celebrity.find();
  res.render('movies/createNewMovieForm', {
    celebrities,
  });
};

exports.createMovie = async (req, res, next) => {
  const getCelebrityIds = await Celebrity.find({ name: { $in: req.body.cast } }).select('id');
  req.body.cast = getCelebrityIds;

  Movie.create(req.body);
  res.redirect('/');
};

exports.getAllMovies = async (req, res, next) => {
  const movies = await Movie.find().populate('cast');
  res.render('movies/getAllMovies', {
    movies,
  });
};

exports.showEditMovieForm = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  res.render('movies/editMovieForm', { movie });
};

exports.editMovie = async (req, res, next) => {
  console.log('RUNNING');
  await Movie.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/`);
};
