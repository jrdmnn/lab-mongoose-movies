const router = require("express").Router();
const Celebrity = require("../models/Celebrity");


router.get('/',(req, res, next) =>{
  Celebrity.find()
  .then(celebrities => {
    console.log(celebrities)
    res.render('celebrities/index', { celebritiesList: celebrities });
  }).catch(err => {
    next(err);
  })
})

router.get('/create', (req, res) => {
  res.render('celebrities/create');
})


router.get('/:id', (req, res, next) =>{
  Celebrity.findById(req.params.id)
  .then(celebrities => {
  res.render('celebrities/show', { celebritiesList: celebrities });
})
})


router.post('/', (req, res) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(celebrityFromDB => {
    console.log(`This celebritywas just created ${celebrityFromDB}`);
    res.redirect(`celebrities/${celebrityFromDB._id}`);
  })
})

router.post('/:id/delete', (req, res, next) => {
  console.log(req.params.id)
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    })
});


router.post('/:id/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then (() => {

      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    })
});

router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebrityFromDB => {
    res.render('celebrities/edit', { celebrity: celebrityFromDB });
  })
  .catch(err => {
    next(err);
  });
});


module.exports = router;