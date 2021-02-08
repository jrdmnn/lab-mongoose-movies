const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  Celebrity.find().then(celebrities => {
    res.render('celebrities/index', { celebritiesList: celebrities })
  }).catch(err => {
    console.log(err);
  })
});


router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
})

router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name: name, occupation: occupation, catchPhrase: catchPhrase });
  newCelebrity.save();
  res.redirect('celebrities');
})

router.post('/celebrities/:id/delete', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndRemove(celebrityId)
    .then(() => {
    res.redirect('/celebrities');
  }).catch(err => {
      console.log(err);
    })
})


router.get('/celebrities/:id/edit', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((editedCelebrity) => {
    res.render('/celebrities/edit', {editedCelebrity: editedCelebrity});
  }).catch(err => {
      console.log(err);
    })
})


router.post('/celebrities/:id', (req, res) => {
  const celebrityId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(celebrityId, { name: name, occupation: occupation, catchPhrase: catchPhrase })
    .then(() => {
      res.redirect('/celebrities')
    }).catch(err => {
      console.log(err);
    })
})

router.get('/celebrities/:id', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then(celebrity => {
      //console.log(`my log from router.get: `, celebrity);
      res.render('celebrities/show', { celebrityDetails: celebrity });
    }).catch(err => {
      console.log(err);
    })
})

module.exports = router;