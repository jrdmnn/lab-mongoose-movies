const router = require('express').Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { celebrityList: celebrities });
    }).catch(err => {
      next(err);
    });
});

router.post('/celebrities', (req, res) => {
  //In this case it also works to directly pass the req.body object. Is there a reason not do it like this?
  Celebrity.create(req.body)
    .then(() => {
    res.redirect('/celebrities');
  }).catch(err => {
    console.log(err);
    res.render('celebrities/new');
  });
});

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
});

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/show', { celebrityDetails: celebrity });
    }).catch(err => {
      next(err);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/celebrities');
    }).catch(err => {
      next(err);
    });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrityDetails: celebrity });
    }).catch(err => {
      next(err);
    });
});

router.post('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/celebrities');
    }).catch(err => {
      next(err);
    });
});

module.exports = router;