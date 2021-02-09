const router = require('express').Router();

const celebrityController = require('../controllers/celebrityController');

router.route('/').get(celebrityController.getAllCelebrities);
router.route('/').post(celebrityController.createCelebrity);

router.route('/new').get(celebrityController.showCreateCelebrityForm);
router.route('/:id').get(celebrityController.getCelebrity);

router.route('/:id/delete').post(celebrityController.deleteCelebrity);

router.route('/:id/edit').get(celebrityController.showEditCelebrityForm);
router.route('/:id/edit').post(celebrityController.editCelebrity);

module.exports = router;
