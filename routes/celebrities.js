const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  console.log('celebrities')
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { celebrityList: celebrities });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new')
});

router.get('/celebrities/:id', (req, res, next) => {
  const celebrityDetail = req.params.id;
  Celebrity.findById(celebrityDetail)
    .then(celebrity => {
      res.render('celebrities/show', { celebrityDetails: celebrity })
    })
    .catch(err => {
      next(err)
    })
});

router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(celebrityAdded => {
      console.log(`A celebrity was added: ${celebrityAdded}`);
      res.redirect(`/celebrities/${celebrityAdded._id}`)
    })
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findByIdAndDelete(celebId)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    })
});


module.exports = router;