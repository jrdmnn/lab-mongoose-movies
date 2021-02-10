const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

/*
CRUD = Create, Read, Update, Delete 

 this route listen  to get request.
 'routes/celebrities = where to listen 
 callbackF = what to do when the req gping to this route. 
 next => move on to the next request handler 
*/

router.get('/celebrities', (req, res, next) => {
  /* find data from the Celebrity model 
   find() to get all the collection, with no parameter. 
    or just the Celebrity that matches the query ( find({name: 'name' })). find returns the whole collection or a query as an array */ 
  Celebrity.find().then(celebrityFromDB => {
    console.log(celebrityFromDB);
    /* Is render a handlebar method?
     The res. render() function is used to render a view and sends
     the rendered HTML string to the client. 
    The object is now abailable in the celebrities/index file
    celebritiesList is the key for the array in the Db
    hbs always checks the layout by default. sending view to the client. */
    res.render('celebrities/index', { celebrityList: celebrityFromDB})
    next();
  }).catch(err => {
    console.log(err);
  })
  
})



router.get('/celebrities/:id', (req, res ) => {
  // return the Id from Data as an array. 
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