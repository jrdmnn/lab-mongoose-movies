const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res) => {
  Celebrity.find()
    .then(celebrities => res.render('celebrities/index', {celebrities}))
    .catch(error => console.log(error));

});

router.post('/', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({name, occupation, catchPhrase})
    .then(celebrity => res.redirect(`/celebrities/${celebrity._id}`))
    .catch(error => res.redirect('/celebrities/new'));
});

router.get('/new', (req, res) => {
  res.render('/new', {});
});

router.post('/:id/delete', (req, res) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/celebrities'))
    .catch(error => console.log(error));
});

router.get('/:id/edit', (req, res) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => res.render('celebrities/edit', {celebrity}))
    .catch(error => console.log(error));
});

router.get('/:id', (req, res) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => res.render('celebrities/show', {celebrity}))
    .catch(error => console.log(error));
});

router.post('/:id', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then(() => res.redirect(`/celebrities`))
    .catch(error => console.log(error));
});


module.exports = router;