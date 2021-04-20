const Movie = require('../models/movie')
const Celebrity = require('../models/celebrity')

const router = require("express").Router(); // What does that mean ?

router.get('/', (req,res,next) => {
    Movie.find()
    .then(moviesList => {
        console.log(moviesList)
        res.render('movies/index', {moviesList})
    })
    
})

router.get('/new', (req,res,next) => {
    Celebrity.find()
    .then(celebrityList =>{
        const celebritiesNames = celebrityList.map(function(name){
            return name.name
        })
        console.log(celebrityList)
        res.render('movies/new', {celebritiesNames})
    })
})


router.post('/', (req,res,next)=> {
    const {title, genre, plot, cast} = req.body;
    Movie.create({
        title : title,
        genre: genre,
        plot: plot,
        cast: cast
        })
        .then(() => {
            res.redirect('movies')
        })
        .catch(() =>{
            next(err);
        })
})


module.exports = router;