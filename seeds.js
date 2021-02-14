const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movies = require('./models/Movies');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrity = [
  {
    name: 'Keanu Reeves',
    occupation: 'actor',
    catchPhrase: `You're awesome!`
  },
  {
    name: 'Tom Segura',
    occupation: 'stand-up comedian',
    catchPhrase: `Completely Normal`
  },
  {
    name: 'Donald Glover',
    occupation: 'artist',
    catchPhrase: `This is America!`
  },
  {
    name: "Leonardo diCaprio",
    occupation: "actor",
    catchPhrase: "I'm the king of the world",
  },
  {
    name: "Harrison Ford",
    occupation: "actor",
    catchPhrase: "I hate snakes",
  },
  {
    name: "Christoph Waltz",
    occupation: "actor",
    catchPhrase: "I was expecting you James",
  },
  {
    name: "Samuel L. Jackson",
    occupation: "actor",
    catchPhrase: "Say what again"
  }
];

Celebrity.insertMany(celebrity)
  .then(celebrity => {
    console.log(`Sucess! Added ${celebrity.length} to the database!`);
    mongoose.connection.close();
  })
    .catch(err => console.log(err));

const movie = [ {
  title: `Return of the Jedi`,
  genre: `sci-fi`,
  plot: `Luke brings balance to the force`,
  cast: []
}]

Movies.insertMany(movie)
  .then(movie => {
    console.log(`Sucess! Added ${movie.length} to the database!`);
    mongoose.connection.close();
  })
    .catch(err => console.log(err));