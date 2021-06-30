const router = require("express").Router();
// ../ to go up one folder
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
	// get all the books	
	Celebrity.find()
		.then(celebritiesFromDB => {
			// render a view books
			// console.log(booksFromDB)
			res.render('celebrities', { celebritiesList: celebritiesFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new.hbs');
});

router.get('/celebrities/:id', (req, res, next) => {
	console.log(req.params.id);
	const celebritiesId = req.params.id;
	// get the celebrity with the clicked id
	Celebrity.findById(celebritiesId)
		.then(celebrityFromDB => {
			console.log(celebrityFromDB);
			// render the details view
			res.render('celebrities/show.hbs', { celebrityDetails: celebrityFromDB });
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      res.render('/celebrities/new.hbs');
      next(err);
    })
});


router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    })
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;