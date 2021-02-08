const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
    useNewUrlParser: true,
});

const celebrities = [
    {
        name: 'Tom Jones',
        occupation: 'singer',
        catchPhrase: 'Hey',
    },
    {
        name: 'Mina',
        occupation: 'singer',
        catchPhrase: 'E poi..',
    },
    {
        name: 'Elvis Costello',
        occupation: 'singer',
        catchPhrase: 'cool!',
    },
    {
        name: 'Leonardo Di Caprio',
        occupation: 'actor',
        catchPhrase: 'I didnt do it!',
    },
];

Celebrity.insertMany(celebrities)
    .then((celebs) => {
        console.log(`Success! Added ${celebs.length} books to the database`);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
