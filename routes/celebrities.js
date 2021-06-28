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

module.exports = router;
