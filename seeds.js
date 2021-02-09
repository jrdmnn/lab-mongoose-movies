const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity');
const Movie = require('./models/movie');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  userNewUrlParser: true
});




const movies = [
  {
    title: 'aaa',
    genre: 'aaa',
    plot: 'aaa',
    cast: {
      name: 'Steve Jobs',
      occupation: 'Dead',
      catchPhras: "I'll do it",
    }
  },
  {
    title: 'bbb',
    genre: 'bbb',
    plot: 'bbb',
    cast: {
      name: 'Marky Mark',
      occupation: 'Actor',
      catchPhras: "Sup"
    }
  },
  {
    title: 'ccc',
    genre: 'ccc',
    plot: 'ccc',
    cast: {
      name: 'Tom Cruise',
      occupation: 'Actor',
      catchPhras: "Goose",
    }
  }
  ]
  

// Celebrity.create(celebrity)
//   .then(celebrity => {
//     console.log(`Success! Added ${celebrity.length} celebrities to the database.`);
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.log(err);
//   });

//   Movie.create(movie)
//   .then(movie => {
//     console.log(`Success! Added ${movie.length} movies to the database.`);
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.log(err);
//   });


  
  movies.forEach(movie => {
    Movie.create(movie.cast).then(dbMovie => {
    movie.cast = dbMovie._id;
    Celebrity.create(movie)
  })
})