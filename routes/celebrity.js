const router = require('express').Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next) => {
  res.render('celebrities');
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/celebrities/new', (req, res, next) => {
  res.redirect(`/celebrities/${_id}`);
});

router.get('/celebrities/:id', (req, res, next) => {
  res.render('celebrities/show');
});

router.get('/celebrity/:id/edit', (req, res, next) => {
  res.render('celebrities/edit');
});

router.post('/celebrity/:id/edit', (req, res, next) => {
  res.redirect(`/celebrity/${_id}`);
});

module.exports = router;
