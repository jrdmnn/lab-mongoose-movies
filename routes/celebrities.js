const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

/*
 this route listen  to get request.
 'routes/celebrities = where to listen 
 callbackF = what to do when the req gping to this route. 
 next => move on to the next request handler 
*/


router.get('/celebrities', (req, res, next) => {
  // asking data from the product model 
  Celebrity.find().then(celebrityFromDB => {
    console.log(celebrityFromDB);
    // Take the context from celebritiy/index hbs always checks the ////layout by default. 
    //Is render a handlebar method? 
    //The res. render() function is used to render a view and sends the rendered HTML string to the client
    // 2 param need to be a objec. Need a key to pass an array inside
    // celebritiesList is the key for the array in the Db
    // you can name it how you want and use this  in the file.  
    // This object is now abailable in the celebrities/index file
    // sending view to the client 
    res.render('celebrities/index', { celebrityList: celebrityFromDB})
    next();
  }).catch(err => {
    console.log(err);
  })
  
})



router.get('/celebrities/:id', (req, res ) => {
  Celebrity.findById(req.params.id ).then(celebrityFromDB => {
    console.log(celebrityFromDB);
    // The object is now available in the celebrities/show file
    res.render('celebrities/show', { celebritiesDetails: celebrityFromDB})
  }).catch(err => {
    console.log(err);
  })
  
})


router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
})




module.exports = router;