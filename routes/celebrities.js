const router = require("express").Router();

const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get("/celebrities", (req, res, next) => {

  Celebrity.find()
		.then(celebritiesFromDB => {
			// console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebritiesFromDB, title: 'Celebrities' });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get("/celebrities/new", (req, res, next) => {
  res.render('celebrities/new', { title: 'Add celebrity' });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
		.then(celebrity => {
			// console.log(celebrity)
			res.render(`celebrities/show`, { celebrity, title: celebrity.name });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
		.then(celebrity => {
			// console.log(celebrity)
			res.render(`celebrities/edit`, { celebrity, title: 'Edit celebrity' });
		})
		.catch(err => {
			console.log(err)
		})
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
	.then(celebrity => {
    console.log(`Success! Added ${celebrity} to the database`);
    res.redirect('/celebrities');
	})
	.catch(err => {
		console.log(err);
    res.render('celebrities/new', { title: 'Add celebrity' });
	})
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
		.then(celebrity => {
			console.log('Celebrity deleted');
			res.redirect('/celebrities');
		})
		.catch(err => {
			console.log(err)
		})
});

router.post("/celebrities/:id", (req, res, next) => {
  console.log(req.body)
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase
  })
	.then(celebrity => {
    console.log(`Successully edited ${celebrity}`);
    // res.redirect('/celebrities/:id');
    res.redirect(`/celebrities/${celebrity._id}`);
	})
	.catch(err => {
		console.log(err);
	})
});

module.exports = router;
