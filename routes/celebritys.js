const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('routes/celebrities', (req, res) => {
  
  Celebrity.find().then(celebrityFromDB => {
    console.log(celebrityFromDB);
    
    res.render('celebritys', { celebrityList: celebrityFromDB})
  }).catch(err => {
    console.log(err);
  })
})


router.post('/celebritys', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const occupation = req.body. occupation;
  const catchPhrase = req.body.catchPhrase;
 
  // const { title, author, decription, rating } = req.body; 

  console.log(name, occupation, catchPhrase );
  Celebrity.create({
    name: name ,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })

    .then( celebrity => {
      console.log('this celebrity was just created: ', celebrity);
      res.redirect(`/celebrity/${celebrity._id}`)
      
    })
    
})


module.exports = router;