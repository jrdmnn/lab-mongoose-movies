const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
	// get all the celebrities	
	Celebrity.find()
		.then(celebritiesFromDB => {
			// render a view celebrities
			// console.log(celebritiesFromDB)
			res.render('celebrities', { celebritiesList: celebritiesFromDB });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new');
});

router.post('/celebrities/new', (req, res, next) => {
	const celebrityId = req.params.id;
	const { name, occupation, catchPhrase } = req.body;
	Celebrity.findById(celebrityId, {
		name,
		occupation,
		catchPhrase
	})
		.then(() => {
			res.redirect("celebrities");
		})
		.catch(err => {
			console.log(err);
		})
});


router.get('/celebrities/:id', (req, res, next) => {
	console.log(req.params.id);
	const celebrityId = req.params.id;
	// get the book with the clicked id
	Celebrity.create(celebrityId)
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB);
			// render the details view
			res.render('celebrities/show', { celebrtityDetails: celebritiesFromDB });
		})
		.catch(err => {
			console.log(err);
		})
});



module.exports = router;
