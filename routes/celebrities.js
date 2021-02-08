const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  Celebrity.find().then(celebritiesFromDb => {
    res.render('celebrities/index', { celebList : celebritiesFromDb})
  }).catch(err => {
    console.log(err);
  })

});

router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }).then(celebrity => {
    console.log('this celebrity was created', celebrity);
    res.redirect('/celebrities')
  }).catch(err => {
    console.log(err);
    res.render('/celebrities/new');
  })
})

router.post('/celebrities/delete/:id', (req, res) => {
  const celebId = req.params.id;
  Celebrity.findByIdAndRemove(celebId)
  .then(() => {
    res.redirect('/celebrities')
  }).catch(err => {
    console.log(err);
  })
});

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new', {})
})

router.get('/celebrities/:id', (req, res) => {
  const celebId = req.params.id;
  Celebrity.findById(celebId)
  .then(celebrityDetails => {
    res.render('celebrities/show', { celebDetails : celebrityDetails})
  }).catch(err => {
    console.log(err);
  })
})

module.exports = router;