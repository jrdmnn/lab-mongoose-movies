const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  Celebrity.find().then(celebrities => {
    res.render('celebrities/index', { celebritiesList: celebrities })
  }).catch(err => {
    console.log(err);
  })
});


router.get('/celebrities/:id', (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then(celebrity => {
      console.log(`my log from router.get: `, celebrity);
      res.render('celebrities/show', { celebrityDetails: celebrity });
    }).catch(err => {
    console.log(err);
  })
})



module.exports = router;