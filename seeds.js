const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useFindAndModify: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: 'Tom Cruise',
    occupation: 'actor',
    catchPhrase: 'foo bar'
  },
  {
    name: 'Beyonce',
    occupation: 'singer',
    catchPhrase: 'foo bar'
  },
  {
    name: 'Daffy Duck',
    occupation: 'cartoon',
    catchPhrase: 'foo bar'
  },
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });