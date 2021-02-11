const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

// Find celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((celeb) => {
            console.log('celebrities', celeb);
            res.render('celebrities/index', { celeb });
        })
        .catch((err) => {
            next(err);
        });
});

// Form
router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
});

// See celebrity details
router.get('/celebrities/:id', (req, res, next) => {
    console.log('req.params', req.params.id);
    Celebrity.findById(req.params.id)
        .then((celeb) => {
            res.render('celebrities/show', { celeb });
        })
        .catch((err) => {
            next(err);
        });
});

// Update celebrity
router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celeb) => {
            res.render('celebrities/edit', { celeb });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

router.post('/celebrities/:id', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.findByIdAndUpdate(req.params.id, {
        name,
        occupation,
        catchPhrase,
    })
        .then(() => {
            res.status(200).redirect('/celebrities/index');
        })
        .catch((err) => {
            next(err);
        });
});

// Add celebrity
router.post('/celebrities', (req, res) => {
    preventDefault();
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({
        name,
        occupation,
        catchPhrase,
    })
        .then((celeb) => {
            console.log('This celebrity was added', celeb);
            res.redirect(`/celebrities`);
        })
        .catch((err) => {
            console.log(err);
            res.redirect(`/celebrities/new`);
        });
});

// Remove celebrity
router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.id)
        .then((celeb) => {
            console.log('This celebrity was removed', celeb);
            res.redirect(`/celebrities`);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
