const router = require('express').Router()
const Celebrity = require('../models/Celebrity')

router.get("/celebrities", (req,res,next) => {

  Celebrity.find().then(celebsFromDB => {
  //console.log(celebsFromDB);
  res.render('celebrities/index.hbs', { celebsList: celebsFromDB })
}).catch(err => {
  console.log(err)
})
})
router.get('/celebrities/new', (req,res) => {
  res.render("celebrities/new.hbs" )
})

router.get('/celebrities/:id', (req,res) => {
  //console.log('LOOK HERE', req.params)
  const celebId = req.params.id
  //console.log('Id is here', celebId)
  Celebrity.findById(celebId)
  .then(celebFromDB => {
  //console.log('Here we are:', celebFromDB)
    res.render('celebrities/show.hbs', { celebrityList: celebFromDB })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/celebrities/:id/edit', (req,res) => {
  const celebId = req.params.id
  Celebrity.findById(celebId)
  .then(celebFromDB => {
    res.render('celebrities/edit.hbs', { celebrityList: celebFromDB })
  })
})

router.post('/celebrities', (req,res) => {
  //console.log('WHERE AM I:', req.body)
  const {name, occupation, catchPhrase} = req.body
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(celeb => {
    res.redirect('celebrities/');
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/celebrities/:id/delete', (req,res) => {
  const celebId = req.params.id
  console.log(celebId)
  Celebrity.findByIdAndDelete(celebId)
  .then(()=> {
    res.redirect('/celebrities')
  })
  .catch(err => {
    console.log(err)
  })
})

//unsure check this 
router.post('/celebrities/:id', (req,res) => {
  Celebrity.updateOne({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,

  })
  .then(celeb => {
    res.redirect('celebrities/');
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router