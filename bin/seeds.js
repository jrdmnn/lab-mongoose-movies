const mongoose          = require('mongoose');
const Celebrity         = require('../models/celebrity.js')

const DB_NAME           = 'starter-code'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const celebrities = [
    {name: 'Angelina Jolie', occupation: 'Actress', catchPhrase: 'I have so much in my life. I want to be of value of the world'},
    {name: 'Brad Pitt', occupation: 'Actor', catchPhrase: 'Heartthrobs are a dime a dozen'},
    {name: 'Kim Kardashian', occupation: 'Influencer', catchPhrase: 'I broke my nail!'}
];

Celebrity.create(celebrities)
    .then(celebritiesFromDB => {
        console.log(`Created ${celebritiesFromDB.length} celebrities`);

        mongoose.connection.close()
    }).catch(error => console.log(`An error ocurred: ${error}`))



   const mongoose          = require('mongoose');
   const Movie             = require('../models/movie.js')

   const DB_NAME           = 'starter-code'

   mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
       useCreateIndex: true,
       useNewUrlParser: true,
       useUnifiedTopology: true
   });

   const movies = [
    {title: 'Scream', genre: 'Terror', plot: 'run for your life'},
    {title: 'Call me by your name', genre: 'Drama', plot: 'the first love'},
    {title: 'Blue Jasmine', genre: 'Drama/Comedia', plot: 'Life is a whirlwind'}
];

Movie.create(movies)
    .then(moviesFromDB => {
        console.log(`Created ${moviesFromDB.length} movies`);

        mongoose.connection.close()
    }).catch(error => console.log(`An error ocurred: ${error}`))