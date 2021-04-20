const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/", (req, res, next) => {
  Celebrity.find().then(celebrities => {
    res.render("celebrities/index", { celebrities });
    console.log(celebrities)
  }).catch(err => next(err))
});

router.post('/', (req, res, next) => {
  Celebrity.create(req.body)
    .then(celebrity => {
      console.log(celebrity)
      res.redirect(`celebrities/`)
    }).catch(err => {
      if (String(err).includes("MongoError: E11000")) {
        res.render('addForm', {
          error_message: 'The celebrity you just tried to add is already in the DB!',
          error: err
        });
      } else {
        next(err);
      }
    })
})

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
})

router.get('/delete/:id', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/celebrities'))
    .catch(err => next(err))
})

router.get('/edit/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => res.render('celebrities/edit', { celebrity }))
    .catch(err => next(err))
})

router.post('/edit/:id', (req, res, next) => {
  const { name, catchPhrase, imageURL, occupation } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name, catchPhrase, imageURL, occupation })
    .then(celebrity => res.redirect('/celebrities/' + celebrity._id))
    .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/show', { celebrity })
    }).catch(err => next(err))
});

module.exports = router;
