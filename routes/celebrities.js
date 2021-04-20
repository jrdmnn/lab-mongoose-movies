const router = require("express").Router();
const Celebrity = require("../models/Celebrity");

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebs => {
      res.render('celebrities/index', { celebList: celebs })
    })
    .catch(err => {
      next(err);
    })
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new')
})

router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(celebrities => {
      console.log(`new celebrity from ${celebrities}`);
      res.redirect('/celebrities/')
    })
    .catch(err => {
      next(err);
    })
})

router.get('/celebrities/:id', (req, res, next) => {
  console.log(req.params.id)
  Celebrity.findById(req.params.id)
    .then(celeb => {
      res.render('celebrities/show', { celebData: celeb })
      
    })
    .catch(err => {
      next(err);
    })
})

router.get('/celebrities/edit/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celeb => {
      res.render('celebrities/edit', {celebData: celeb})
    })
    .catch(err => {
      next(err);
    })
});

router.post('/celebrities/:id', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      next(err);
    })
})

router.post('/celebrities/edit/:id', (req, res) => {
  const celebId = req.params.id;
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(celebId, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(celeb => {
      console.log(`${celeb} has been updated`);
      res.redirect('/celebrities')
    })
    .catch(err => {
      next(err);
    })
})


module.exports = router