const mongoose = require('mongoose')
// const Celebrity = require('./models/Celebrity')
const Movie = require('./models/Movie')

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true
});



// const celebrities = [
//   {
//     name: 'Justin Bieber',
//     occupation: 'Singer, Producer',
//     catchPhrase: 'God loves The Biebers'
//   },
//   {
//     name: 'Thimothee Chalamet',
//     occupation: 'Actor',
//     catchPhrase: 'I am not overrated'
//   },
//   {
//     name: 'Madonna',
//     occupation: 'Singer',
//     catchPhrase: 'I may be have lost it with my last operation'
//   },
// ]

// Celebrity.insertMany(celebrities)
//   .then(books => {
//     console.log(`Success! Added ${celebrities.length} celebrities to the DB`)
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.log(err)
//   });

Movie.createCollection()
  .then(() => {
    console.log(`Movies Collection created`)
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  });
