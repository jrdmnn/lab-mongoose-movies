const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/vip', {
    userNewUrlParser: true
});

const celebrities = [{
        name: 'Tom Cruise',
        occupation: 'actor',
        catchPhrase: 'I think nothing is impossible',

    },
    {
        name: 'Megan Fox',
        occupation: 'actor',
        catchPhrase: 'why fall in love if you can fall asleep',

    },
    {
        name: 'Cristiano Ronaldo',
        occupation: 'football player',
        catchPhrase: 'the important thing is not to win, but the only thing that counts',

    }
]

Celebrity.insertMany(celebrities)
    .then(celebrities => {
        console.log(`Success! Added ${celebrities.length} celebrities to the database.`);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
    });