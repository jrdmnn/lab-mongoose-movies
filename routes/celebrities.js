const router = require('express').Router();
const Celeb = require('../models/celebrity');

router.get('/', (req, res, next) => {
    Celeb.find()
        .then(celebs => {
            console.log(celebs);
            res.render('celebrities/index', { celebList: celebs });
        })
        .catch(err => {
            next(err);
        });
});

router.get('/new', (req, res) => {
    res.render('celebrities/celebForm');
});



router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    const celebId = req.params.id;

    Celeb.findById(celebId)
        .then(celeb => {
            console.log(celeb);
            res.render('celebrities/show', { celebDetails: celeb });
        })
        .catch(err => {
            next(err);
        });
});


router.post('/new', (req, res, next) => {
    console.log(req.body);
    const { name, occupation, catchPhrase } = req.body

    Celeb.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    })
        .then(celebFromDB => {
            console.log(`This celebrity was just created ${celebFromDB}`);
            res.redirect('/celebrities');
        })
        .catch(err => {
            next(err);
        });
});

router.post('/:id/delete', (req, res, next) => {
    const celebId = req.params.id;

    Celeb.findByIdAndRemove(celebId)
        .then(() => {
            console.log('Celebrity has been deleted');
            res.redirect('/celebrities');
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id/edit', (req, res, next) => {
    console.log('hello', req.params.id);
    const celebId = req.params.id;
    Celebrity.findById(celebId)
        .then((celeb) => {
            res.render('celebrities/edit.hbs', { celeb });
        })
        .catch(err => {
            next(err);
        });
});





module.exports = router;