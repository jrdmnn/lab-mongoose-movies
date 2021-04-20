const mongoose = require('mongoose');
const Celeb = require('./models/celebrity');
const Movie = require('./models/movie');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const celebs = [
//   {
//     name: "Keanu Reeves",
//     occupation: "Actor",
//     catchPhrase: "Youre breathtaking"
//   },
//   {
//     name: "Miley Cyrus",
//     occupation: "Singer",
//     catchPhrase: "Definitely not Hannah Montana"
//   },
//   {
//     name: "Taylor Swift",
//     occupation: "Singer",
//     catchPhrase: "Its wine o clock"
//   }
// ];

// Celeb.insertMany(celebs)
//   .then(celebs => {
//     console.log(`Success! Added ${celebs.length} celebrities to the database`);
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.log(`An error occured: ${err}`);
//   });

const movies = [
  {
    title: "Creed II",
    genre: "Sports drama",
    plot: "In 2018, three years after his loss to Pretty Ricky Conlan,[a] Donnie Creed has won six straight bouts, culminating in a victory over Danny Stuntman Wheeler to win the WBC World Heavyweight Championship.",
    cast: [
      {
        name: 'Sylvester Stallone'
      },
      {
        name: 'Tessa Thompson'
      }
    ]
  },
  {
    title: "Terminator: Dark Fate",
    genre: "Science fiction action",
    plot: "In 1998, three years after destroying Cyberdyne Systems Corporation, Sarah and John Connor are enjoying life by a beach in Livingston, Guatemala, when they are suddenly accosted by a T-800 Terminator.",
    cast: [
      {
        name: 'Arnold Schwarzenegger'
      },
      {
        name: 'Linda Hamilton'
      }
    ]
  }
];

(async () => {
  for (let movie of movies) {
    const dbMovie = await Movie.insertMany(movie.Movie);
    movie.cast = dbMovie._id;
    await Movie.insertMany(movie);
    console.log(`Success! Added ${movies.length} movies to the database`);
  }
  mongoose.connection.close();
})()