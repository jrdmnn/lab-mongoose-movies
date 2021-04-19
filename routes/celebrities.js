const router = require("express").Router();
const {
  findById
} = require("../models/Celebrity");
const Celebrity = require("../models/Celebrity");

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      console.log(celebrities);
      res.render('celebrities/index', {
        celebList: celebrities
      });
    })
    .catch(err => {
      next(err);
    })
});

router.post('/celebrities', (req, res) => {
  const {
    name,
    occupation,
    catchPhrase
  } = req.body;
  Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase
    })
    .then(celeb => {
      res.redirect(`/celebrities`)
    })
    .catch(err => {
      console.log(err);
      res.redirect('/celebrities/new')
    })
});

router.get('/celebrities/new', (req, res) => {
  console.log("opening new page");
  res.render('celebrities/new');
});



router.get('/celebrities/:id', (req, res, next) => {
  console.log(req.params.id);
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then(celeb => {
      console.log("okay", celeb);
      res.render('celebrities/show', {
        celebInfo: celeb
      })
    })
    .catch(err => {
      next(err);
    })
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findByIdAndRemove(celebId)
    .then(res.redirect('/celebrities'))
    .catch(err => {
      next(err)
    });
})

router.get('/celebrities/:id/edit', (req, res, next) => {
  celebId = req.params.id; 
  Celebrity.findById(celebId)
    .then(celeb => {
      res.render('celebrities/edit', {
        celebInfo: celeb
      })
    })
    .catch(err => next(err));
})

router.post('/celebrities/:id/edit', (req, res, next)=> {
  const celebId = req.params.id;
  const {
    name,
    occupation,
    catchPhrase
  } = req.body;
  Celebrity.findByIdAndUpdate(celebId, {
    name : name,
    occupation : occupation,
    catchPhrase : catchPhrase
  })
  .then(res.redirect('/celebrities'))
    .catch(err => {
      next(err)
    });
})

module.exports = router;