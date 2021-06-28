const router = require("express").Router();
// ../ to go up one folder
const Celebrity = require('../models/celebrity');

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
  
    res.redirect('celebrities')
  
})


router.get('/celebrities', (req, res, next) => {
	// get all the celebrities	
	Celebrity.find()
		.then(celebritiesFromDB => {
			// render a view books
			// console.log(booksFromDB)
			res.render('celebrities/index', { celebritiesList: celebritiesFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});



router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.get('/celebrities/:id/edit', (req, res, next) => {

	Celebrity.findById(req.params.id)
		.then(celebritiesFromDB => {

			res.render('celebrities/edit', { celebritiesEdit: celebritiesFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});


router.get('/celebrities/:id', (req, res, next) => {
	// get all the celebrities	
  console.log(req.params.id)
	Celebrity.findById(req.params.id)
		.then(celebritiesFromDB => {
			// render a view books
			// console.log(booksFromDB)
			res.render('celebrities/show', { celebritiesShow: celebritiesFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});



router.post('/celebrities/:id/delete', (req, res, next) => {
	// get all the celebrities	
  console.log(req.params.id)
	Celebrity.findByIdAndRemove(req.params.id)
		.then(celebritiesFromDB => {
			// render a view books
			// console.log(booksFromDB)
			res.redirect('/celebrities');
		})
		.catch(err => {
			console.log(err)
		})
});



router.post('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(celebrityId, {
    name,
    occupation,
    catchPhrase
  })
  
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity._id}`)
    })
    .catch(err => {
      console.log(err)
    })
})


module.exports = router;
