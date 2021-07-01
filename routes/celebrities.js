const router = require("express").Router();
const { param } = require(".");
// ../ to go up one folder
const Celebrity = require('../models/Celebrity');

router.get('/celebrities/index', (req, res, next) => {
	// get all the books	
	Celebrity.find()
		.then(celebritiesFromDB => {
			res.render('celebrities', { celebritiesList: celebritiesFromDB });
      

		})
		.catch(err => {
			console.log(err)
		})
});

router.get('/celebrities/add', (req, res, next) => {
	res.render('celebrities/new');
});




	router.post('/celebrities', (req, res, next) => {
		// get all the books	
		const {name, occupation, catchPhrase} = req.body;
		console.log(name, occupation, catchPhrase)
		Celebrity.create({
			name: name,
			occupation: occupation,
			catchPhrase: catchPhrase
		})
			.then(createdCeleb => {
				console.log(createdCeleb);
				res.redirect(`/`);
			})
			.catch(err => {
				console.log(err)
			})			
	});

	router.get('/celebrities/edit/:id', (req, res, next) => {
		// retrieve the book that should be edited	
		const celebrityID = req.params.id;
		Celebrity.findById(celebrityID)
			.then(celebrityFromDB => {
				console.log(celebrityFromDB);
				// render a form with the book details
				res.render('celebrities/edit', { celebrity: celebrityFromDB });
			})
	});	

router.post('/celebrities/:id/edit', (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body;
	Celebrity.findByIdAndUpdate(req.params.id,{
		name,
		occupation,
		catchPhrase
	})
			.then(() => {
				res.redirect('/');
		})
		.catch(err => {
			console.log(err)
		})
	});

router.get('/celebrities/:id/delete', (req, res, next) => {
	const celebrityId = req.params.id;
	console.log("about to delete")
	Celebrity.findByIdAndDelete(celebrityId)
		.then(() => {
			res.redirect("/");
		})
		.catch(err => {
			console.log(err)
		})
});

router.get('/celebrities/:id', (req, res, next) => {
	// get all the books	
	console.log("party")
  const celebrityID = req.params.id;
  Celebrity.findById(celebrityID)
		.then(celebrityFromDB => {
      console.log(celebrityFromDB)
			res.render('celebrities/show', { celebrityDetails: celebrityFromDB });
		})
		.catch(err => {
			console.log(err)
		})

	});




module.exports = router