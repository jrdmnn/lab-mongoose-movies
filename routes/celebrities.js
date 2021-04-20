const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      //console.log(celebrities)
      res.render('celebrities/index', { celebList: celebrities })
    })
    .catch(err => {
      next(err);
    })
})

router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(celebAdded => {
      console.log(`A celebrity was added: ${celebAdded}`);
      res.redirect(`/celebrities/${celebAdded._id}`)
    })
})



router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new')
})

router.get('/celebrities/:id', (req, res, next) => {
  const celebName = req.params.id;
  Celebrity.findById(celebName)
    .then(celeb => {
      //console.log(celeb);
      res.render('celebrities/show', { celebDetails: celeb })
    })
    .catch(err => {
      next(err)
    })
})

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



router.get('/celebrities/:id/edit', (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then(celeb => {
      res.render('celebrities/edit', { edit: celeb });
    })
});

router.post('/celebrities/:id/edit', (req, res, next) => {
  const celebId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  console.log(req.body)
  Celebrity.findByIdAndUpdate(celebId, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(celeb => {
      res.redirect(`/celebrities`)
    })
    .catch(err => {
      next(err);
    })
})

module.exports = router;