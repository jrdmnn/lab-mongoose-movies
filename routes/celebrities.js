const router = require("express").Router();
const Celebrity = require('../models/Celebrity.js');

// Add celeb form
router.get('/celebrities/new', (req, res) => {
  console.log('add celeb');
  res.render('celebrities/new.hbs')
})

// Add celeb to db
router.post('/celebrities', (req, res) => {
  console.log('try post');
  const {name, occupation, catchPhrase} = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
  .then(celebrity => {
    console.log(celebrity, 'was successfully added.');
    res.redirect(`celebrities/${celebrity._id}`)
  })
  .catch(err => {
    console.log(err);
    res.render('/celebrities/new')
  })
})

//Get all celebs
router.get('/celebrities', (req, res) => {
  Celebrity.find()
    .then(allCelebs => {
      res.render('celebrities/index.hbs', { celebs: allCelebs })
    })
    .catch(err => {
      console.log(err);
    })
})

//Get celeb details
router.get('/celebrities/:id', (req, res) => {
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then(celebrity => {
      res.render('celebrities/show.hbs', { celebrity: celebrity })
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;