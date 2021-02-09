const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  // get all the celebrities from the database -> find() returns all the documents
  Celebrity.find()
    .then(celebritiesFromDB => {
      console.log('the celebs', celebritiesFromDB);
      // render a celebrities view to display them
      res.render('celebrities/index', {celebritiesList: celebritiesFromDB });
  }).catch(err => {
    next(err)
    //console.log(err);
  })
})

router.post('/celebrities', (req, res) => {
  // const name = req.body.name;
  // const occupation = req.body.occupation;
  // const catchPhrase = req.body.catchPhrase;

  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({name, occupation, catchPhrase})
    .then(celebrity => res.redirect(`/celebrities/${celebrity._id}`))
    .catch(err => res.redirect('/celebrities/new'));
      // .save(); ????? create vs. save???
});

router.get('/celebrities/new', (req, res, next) => {
  console.log('hello')
  res.render('celebrities/new')
})

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(celebrity => {
      console.log(celebrity)
      res.redirect('/celebrities')
    }).catch(err => {
        next(err);
        //console.log(err);
      })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
      .then(celebrity => {
        console.log(celebrity)
        res.render('celebrities/edit', {celebrity})
      }).catch(err => {
        next(err)
        //console.log(err);
      })
})

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then(() => res.redirect(`/celebrities`))
    .catch(error => console.log(error));
});

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      console.log(celebrity)
      res.render('celebrities/show', {celebrity})
    }).catch(err => {
        next(err)
        //console.log(err);
      })
})



module.exports = router;
