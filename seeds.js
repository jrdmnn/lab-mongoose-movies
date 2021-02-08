const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  userNewUrlParser: true
});

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "actor",
    catchPhrase: "To be or not to be, that is the question"
  },
  {
    name: "Beyonce",
    occupation: "singer",
    catchPhrase: "I think therefore I am"
  },
  {
    name: "Daffy Duck",
    occupation: "cartoon character",
    catchPhrase: "The stock market is just the marshmallow test for adults"
  }
];

Celebrity.create(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });