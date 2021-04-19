const router = require("express").Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', {
        allCelebrities: celebrities
      })
    })
    .catch(err => {
      next(err);
    })
})

router.post('/celebrities', (req, res, next) => {
  const {
    name,
    occupation,
    phrase
  } = req.body;
  Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: phrase
    })
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(() => {
      res.render('/celebrities/new');
    })
})

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch(err => {
    next(err);
  })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebrity => {
    res.render('celebrities/edit', { celebrityDetails: celebrity })
  })
  .catch(err => {
    next(err);
  })
})

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, phrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name: name,
    occupation: occupation,
    catchPhrase: phrase
  })
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch(err => {
    next(err);
  })
})

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
})

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/show', {
        celebrityDetails: celebrity
      })
    })
    .catch(err => {
      next(err);
    })
})


module.exports = router;