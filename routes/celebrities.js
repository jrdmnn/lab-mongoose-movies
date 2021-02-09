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
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
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

// router.get('/celebrities/:id/delete', (req, res) => {
//   res.render('celebrities');
// })

router.get('/celebrities/:id/delete', (req, res) => {
  const celebrityId = req.params.id;
  console.log(celebrityId)
  Celebrity.findByIdAndDelete(celebrityId)
  .then(() => {
    res.redirect('celebrities')
  }).catch(err => console.log(err))
})

router.get('/celebrities/:id/edit', (req, res) => {
  const celebrityId = req.params.id;
  console.log(celebrityId)
  Celebrity.findById(celebrityId)
  .then(() => {
    res.render(`celebrities/${celebrity._Id}`)
  })
  .catch(err => {
    res.render('celebrities/edit')
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

module.exports = router;