const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
	// get all the books	
	Celebrity.find()
		.then(celesInDB => {
			// render a view books
			console.log(celesInDB);
			res.render('celebrities/index', { celesInDB });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new');
  });

router.post('/celebrities', (req, res, next) => {
	// console.log(req.body);
	const { name, occupation, catchPhrase } = req.body;
	console.log(name, occupation, catchPhrase);
	Celebrity.create({
		name: name,
		occupation: occupation,
		catchPhrase: catchPhrase
	})
		.then(createdCeleb => {
			console.log(`This celebrity has just been added: ${createdCeleb}`);
			// res.render('bookDetails', { bookDetails: createdBook });
			// this is how you redirect in express
			res.redirect(`/celebrities`);
		})
        .catch(err => {
			res.render('celebrities/new');
		})
});

router.get('/celebrities/:id', (req, res, next) => {
	console.log(req.params.id);
	// get the book with the clicked id
	Celebrity.findById(req.params.id)
		.then(celesInDB => {
			console.log(celesInDB);
			// render the details view
			res.render('celebrities/show', { celesInDB });
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/celebrities/:id/delete', (req, res, next) => {
	console.log(req.params.id);
	// delete this book	
	Celebrity.findByIdAndRemove(req.params.id)
		.then(() => {
			// redirect to the books list
			res.redirect(`/celebrities`);
		})
		.catch(err => {
			console.log(err);
		})
});

module.exports = router;
