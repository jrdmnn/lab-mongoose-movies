const router = require("express").Router();
// ../ to go up one folder
const Celebrity = require('../models/Celebrity');

router.get('/celebrities/index', (req, res, next) => {
	// get all the books	
	Celebrity.find()
		.then(celebritiesFromDB => {
      console.log("hiiii")
      console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebritiesList: celebritiesFromDB });
      

		})
		.catch(err => {
			console.log(err)
		})
});

module.exports = router