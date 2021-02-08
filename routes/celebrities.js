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

router.get('/celebrities/:id', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then(celebrity => {
    console.log(celebrity)
    res.render('celebrities/show', { show: celebrity })
  })
  .catch(err => console.log(err))
})

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
})

router.post('celebrities/new', (req,res) => {
  const {name, occpuation, catchPhrase }  = req.body;
  console.log(req.body);
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(celebrity => {
    console.log('This person was just created: '), celebrity;
    res.redirect(`/celebrities/${celebrity._id}`)
  })
})


module.exports = router;