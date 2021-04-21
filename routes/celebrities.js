const Celebrity = require('../models/celebrities');
const Movie = require('../models/Movie');
const router = require("express").Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find().then(celebrities => {
    res.render('celebrities/index', {
      celebrities
    })
  }).catch(err => {
    next(err);
  })
})

router.post('/celebrities', (req, res, next) => {
  const {
    name,
    occupation,
    catchPhrase
  } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }).then(celebrity => {
    res.redirect(`/celebrities/${celebrity._id}`)
  }).catch(err => {
    next(err)
  })
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new')
})

router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId).then(celebrity => {
    res.render('celebrities/show', {
      celebrityDetail: celebrity
    })
  })
})

router.get('/celebrities/:id/delete', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndDelete(celebrityId).then(deletedCelebrity => {
    console.log(`${deletedCelebrity.name} removed`)
    res.redirect('/celebrities')
  }).catch(err => {
    next(err)
  })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId).then(celebrity => {
    res.render('celebrities/edit', {
      editCelebrity: celebrity
    })
  })
})

router.post('/celebrities/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;
  const {
    name,
    occupation,
    catchPhrase
  } = req.body;
  Celebrity.findByIdAndUpdate(celebrityId, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }).then(c => {
    res.redirect('/celebrities')
  }).catch(err => console.log(err))
})

module.exports = router;