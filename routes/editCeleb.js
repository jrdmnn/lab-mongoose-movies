const router = require("express").Router();
const Celebrity = require('../models/Celebrity');


<h2>Edit this celebrity</h2>

router.get('/:id/edit', (req, res) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => res.render('celebrities/edit', {celebrity}))
    .catch(error => console.log(error));
});


module.exports = router;