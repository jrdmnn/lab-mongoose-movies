const Celebrity = require("../models/celebrity");

const router = require("express").Router();

router.get('/', (req, res, next) =>{ //browser require the root
    Celebrity.find()
    .then(celebrities => { //whatever come back has this name
        console.log(celebrities)
        res.render('celebrities/index', {celebrities}); // celebrities is what's the API return to me - could be any name
        //always make sure to pass an object in render as second parameter
})
.catch(err => {
    next(err);
})
})


router.get('/new', (req,res, next) => {
    console.log('Something')
    res.render('celebrities/new');
})

router.get('/:id/delete', (req,res, next) => {
    console.log('test')
    Celebrity.findByIdAndRemove(req.params.id)//{ _id: req.params.id } 
    .then(() =>{
    res.redirect('/celebrities')
})
    .catch(err => {
    next(err);
})
})

router.post('/', (req,res) => {
    const {name, occupation, catchPhrase} = req.body;
    //console.log(req.body, 'test')
     //user input that need conversion to object
    // const newCelibrity = new Celebrity ({ // instance of the celebrity model inititalized with the value entered by the user
    //     name:name, 
    //     occupation:occupation, 
    //     catchPhrase:catchPhrase
    // })
    // newCelibrity.save()
    Celebrity.create({ // 25 - 30 alternate
        name : name,
        occupation: occupation,
        catchPhrase: catchPhrase
        })
    .then(() =>{
        res.redirect('/celebrities')
    })
    .catch(err =>{
        res.render('celebrities/new')
    })
})


module.exports = router;