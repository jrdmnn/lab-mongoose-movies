const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  Celebrity.find()
    .then(celebrityFromDB => {
      // console.log(celebrityFromDB);
      res.render('celebrities/index', { celebrityList: celebrityFromDB })
    })
    .catch(err => console.log(err));
})

router.post('/celebrities', (req,res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name, occupation, catchPhrase);
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(celebrity => {
    console.log('This person was just created: ', celebrity);
    res.redirect(`/celebrities/${celebrity._id}`)
  })
})

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
})

router.get('/celebrities/:id/delete', (req, res, next) => {
  const celebrityId = req.params.id;
  console.log(celebrityId)
  Celebrity.findByIdAndDelete(celebrityId)
  .then(() => {
    res.redirect('/celebrities')
  }).catch(err => next(err))
})

router.get('/celebrities/:id/edit', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then((celebFromDB) => {
    res.render(`celebrities/edit.hbs`, {celebrity: celebFromDB})
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/celebrities/:id', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then(celebrity => {
    console.log(celebrity)
    res.render('celebrities/show', { show: celebrity })
  })
  .catch(err => console.log(err))
})

router.post('/celebrities/:id/edit', (req, res) => {
  const {name, occupation, catchPhrase} = req.body;
  const celebrityId = req.params.id;
  Celebrity.findByIdAndUpdate(celebrityId, {
    name,
    occupation,
    catchPhrase
  })
  .then(() => {
    res.redirect(`/celebrities`)
  })
  .catch(err => console.log(err))
})

module.exports = router;