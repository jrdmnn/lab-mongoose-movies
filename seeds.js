const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: 'Romelu Lukaku',
    occupation: 'Footballer',
    catchPhrase: 'I am the steamroller, chu chu!', 
  },
  {
    name: 'Amy Winehouse',
    occupation: 'Deceased',
    catchPhrase: 'Do you finish that bottle of vodka?'
  },
  {
    name: 'Mel Gibson',
    occupation: 'Lunatic',
    catchPhrase: ''
  }
]

Celebrity.insertMany(celebrities)
  .then(celebs => {
    console.log(`DB of ${celebs.length} items succesfully created`)
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  })