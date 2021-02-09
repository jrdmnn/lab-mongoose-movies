const router = require("express").Router();
 
const Celebrity = require('../models/Celebrity')

/* GET home page */
router.get('/celebrities', (req, res, next) => {
  // console.log('What ')
  Celebrity.find().then(celebritiesDB=>{   
     
    res.render("celebrities/index", {celebrities: celebritiesDB});
  }).catch(err=>console.log(err))
 
});


router.get('/celebrities/new', (req, res, next) => {
  // console.log('What ')
  res.render('celebrities/new')
});

router.post('/celebrities', (req, res) =>{
  const name = req.body.name;
  const occupation =req.body.occupation;
  const catchPhrase = req.body.catchPhrase
  Celebrity.create({name: name, occupation: occupation, catchPhrase: catchPhrase}).then(celeb=>  res.redirect('/celebrities')).catch(err=>console.log(`Something went wrong${err}`))

  
})
// router.get('celebrities/new', (res,req)=>{
  // console.log('HI')
  // res.render('celebrities/new')
//  })
 

router.get('/celebrities/:id', (req, res)=>{
  let celebrityId=req.params.id;
  Celebrity.findById(celebrityId).then(celeb=>{
    console.log(celeb)
    res.render('celebrities/show', {celebrities: celeb})}).catch(err=>console.log(err))
})


//ITERATION 5

router.post('/celebrities/:id/delete', (req,res)=>{
  let celebrityId=req.params.id
  Celebrity.findByIdAndRemove(celebrityId).then(()=> {res.redirect('/celebrities')}).catch(err=>console.log(err))
})


//ITERATION 6
router.get('/celebrities/:id/edit', (req, res)=>{
  let celebId=req.params.id
  Celebrity.findById(celebId).then( celeb=>  res.render('celebrities/edit', {celebrity: celeb}))

})


router.post('/celebrities/:id', (req,res)=>{
  let celebId=req.params.id
  let name=req.body.name;
  let occupation=req.body.occupation;
  let catchPhrase=req.body.catchPhrase;
  Celebrity.updateOne({_id: celebId}, {name:name, occupation:occupation, catchPhrase:catchPhrase})
  .then(celeb=> res.redirect('/celebrities')) 
})

module.exports = router;
