const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: 'Britney Spears',
    occupation: 'Singer',
    catchPhrase: 'Free Britney',
  },
  {
    name: 'Moby',
    occupation: 'Musician',
    catchPhrase: 'Vegan for life',
  },
  {
    name: 'Angelina Jolie',
    occupation: 'Actress',
    catchPhrase: 'Lara Croft',
  }
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  })