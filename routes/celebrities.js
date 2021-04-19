const router = require('express').Router();
const Celebrity = require('../models/Celebrity.js')

/* GET home page */
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(celebrities => {
    res.render('celebrities/index', { celebrities });
  })
  .catch(err => {
    next(err);
  })
});

router.post('/celebrities', (req,res,next) => {
  let {name, occupation, catchPhrase} = req.body;

  Celebrity.create({
    name, occupation, catchPhrase
  })
  .then((celebritity) => {
    console.log(`${celebritity.name} has been added to the database`);
    res.redirect('celebrities')
  })
  .catch(err => {
    res.render('celebrities/new')
  })
})

router.get('/celebrities/new', (req,res,next) => {
  res.render('celebrities/new');
})

router.post('/celebrities/:id/delete', (req,res,next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndRemove(celebrityId)
  .then(() => {
    console.log('An item has been deleted');
    res.redirect('/celebrities');
  })
  .catch(err => {
    next(err);
  })
})

router.get('/celebrities/:id/edit', (req,res,next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then((celebrity) => {
    res.render('celebrities/edit', { celebrity })
  })
  .catch(err => {
    next(err);
  })
})

router.post('/celebrities/:id', (req,res,next) => {
  let {name, occupation, catchPhrase} = req.body;
  Celebrity.update(Celebrity.findById(req.params.id), {name, occupation, catchPhrase})
  .then((celebrity) => {
    console.log(`The entry for "${celebrity.name}" has been updated`);
    res.redirect('/celebrities');
  })
  .catch(err =>
    next(err));
})

router.get('/celebrities/:id', (req,res,next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then(celebrity => {
    res.render('celebrities/show', {celebrity});
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;
