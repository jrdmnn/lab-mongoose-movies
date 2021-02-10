const router = require("express").Router();
const Celebrity = require('../models/Celebrity');


router.get('/new', (req, res) => {
  res.render('new');
})

router.post('/celebrities', (req, res) => {
  console.log(req.body);
  /*
  const name = String;
  const occupation = String;
  const catchPhrase = String;
  */
  const {name, occupation, catchPhrase} = req.body
  console.log("entered: ", name, occupation, catchPhrase);
  Celebrity.create(
    {
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase
    }
  ).then(celebrity => {
    console.log("This celebrity was just created: ", celebrity);
    res.redirect(`/celebrities/${celebrity._id}`);
  });
});

module.exports = router;

