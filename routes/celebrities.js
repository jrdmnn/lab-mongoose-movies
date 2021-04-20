const router = require('express').Router();

const Celebrity = require("../models/Celebrity")

///////
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
  .then(celebrities => {
  res.render("celebrities/index", { celebrities: celebrities });
  })
  .catch(err => {
  next(err);
  })  
});


///////
router.post("/celebrities", (req, res) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchphrase
  })
  .then(celebrity => {
    console.log(`This celebrity was created ${celebrity._id}`);
    res.redirect('celebrities')
  })
    .catch((err) => {
    res.render('celebrities/new')
  })
})


///////
router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
});


///////
router.post('/celebrities/:id', (req, res, next) => {
  const celebId = req.params.id;
  const { name, occupation, catchphrase } = req.body;
  Celebrity.findByIdAndUpdate(celebId, {
    name,
    occupation,
    catchphrase
  })
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      next(err)
    });
})


///////
router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render("celebrities/show", { celebrity: celebrity })
    })
    .catch(err => {
      next(err);
    })
});


///////
router.get('/celebrities/:id/edit', (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity: celebrity })
    })
  .catch(err => {
    next(err)
  })
})


///////
router.post('/celebrities/:id/delete', (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findByIdAndRemove(celebId)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      next(err)
    })
});



module.exports = router;

