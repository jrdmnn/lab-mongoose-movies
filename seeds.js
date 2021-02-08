const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/celebrity', {
  useNewUrlParser: true
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
  }
];

Celebrity.insertMany(celebrity)
  .then(celebrity => {
    console.log(`Sucess! Added ${celebrity.length} to the database!`);
    mongoose.connection.close();
  })
    .catch(err => console.log(err));