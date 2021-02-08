const router = require("express").Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
    Celebrity.find().then(celebritiesFromDB => {
        //console.log(celebritiesFromDB);
        res.render('celebrities/index', { celebritiesList: celebritiesFromDB })
    }).catch(err => {
        console.log(err);
    })
})

router.post('/celebrities', (req, res) => {
    // console.log(req.body)
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({
            name: name,
            occupation: occupation,
            catchPhrase: catchPhrase
        })
        .then(celebrity => {
            res.redirect(`/celebrities/${celebrity._id}`)
        })
})

router.get('/celebrities/:id/delete', (req, res) => {
    const celebrityId = req.params.id;
    Celebrity.findByIdAndDelete(celebrityId)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
    const celebrityId = req.params.id;
    console.log('tryId', celebrityId)
    Celebrity.findById(celebrityId)
        .then(celebretyFromDB => {
            console.log('test', celebretyFromDB);
            res.render('celebrities/edit', { celebrity: celebretyFromDB });
        })
})


router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
})

router.get('/celebrities/:id', (req, res, next) => {
    const celebrityId = req.params.id;
    Celebrity.findById(celebrityId)
        .then(celebrity => {
            //console.log(celebrity);
            res.render('celebrities/show', { show: celebrity })
        })
})

router.post('/celebrities/:id/edit', (req, res) => {
    const celebrityId = req.params.id;
    const { name, occupation, catchPhrase } = req.body;
    console.log(name)
    Celebrity.findByIdAndUpdate(celebrityId, {
            name: name,
            occupation: occupation,
            catchPhrase: catchPhrase
        })
        .then(celebrity => {
            res.redirect(`/celebrities/${celebrity._id}`);
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;