const router = require('express').Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next) => {
  res.render('celebrities');
});

router.get('/celebrity/new', (req, res, next) => {
  res.render('celebritynew');
});

router.get('/celebrity/:id', (req, res, next) => {
  res.render('celebrity');
});

router.get('/celebrity/edit/:id', (req, res, next) => {
  res.render('celebrityedit');
});

module.exports = router;
