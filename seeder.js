const mongoose = require('mongoose');
const colors = require('colors');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
    useNewUrlParser: true,
});

const celebrities = [
    {
        name: 'Tom Jones',
        occupation: 'singer',
        catchPhrase:
            'Love is in the air everywhere I look around. Love is in the air every sight and every sound.',
    },
    {
        name: 'Mina',
        occupation: 'singer',
        catchPhrase:
            "L'arma più certa per garantire il perpetuarsi della nostra illusione di libertà è tenerci nella paura sventolando gli incubi dei futuri bui.",
    },
    {
        name: 'Elvis Costello',
        occupation: 'singer',
        catchPhrase: 'I used to be disgusted; now I try to be amused.',
    },
    {
        name: 'Leonardo Di Caprio',
        occupation: 'actor',
        catchPhrase:
            "If you can do what you do best and be happy, you're further along in life than most people.",
    },
    {
        name: 'Christopher Lambert',
        occupation: 'actor',
        catchPhrase: 'There can be only one!',
    },
    {
        name: 'Joe Rogan',
        occupation: 'comedian',
        catchPhrase:
            "Aspire to be the man you pretend to be when you're trying to get laid.",
    },
];

Celebrity.insertMany(celebrities)
    .then((celebs) => {
        console.log(
            `Success! Added ${celebs.length} celebrities to the database`
                .inverse.green
        );
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
