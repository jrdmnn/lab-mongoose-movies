const router = require('express').Router();

const movieController = require('../controllers/movieController');

router.route('/new').get(movieController.showCreateCelebrityForm);
router.route('/').get(movieController.getAllMovies);
router.route('/').post(movieController.createMovie);

router.route('/:id/edit').get(movieController.showEditMovieForm);
router.route('/:id/edit').post(movieController.editMovie);

module.exports = router;
