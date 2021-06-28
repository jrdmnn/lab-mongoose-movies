const router = require("express").Router();

const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get("/celebrities", (req, res, next) => {

  Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebritiesFromDB, title: 'Celebrities' });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get("/celebrities/:id", (req, res, next) => {

  Celebrity.findById(req.params.id)
		.then(celebrity => {
			console.log(celebrity)
			res.render(`celebrities/show`, { celebrity, title: celebrity.name });
		})
		.catch(err => {
			console.log(err)
		})
});

module.exports = router;
