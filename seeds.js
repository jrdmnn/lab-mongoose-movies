const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  userNewUrlParser: true
});

celebrities = [
  {
    name: "Oli P.",
    occupation: "actor",
    catchPhrase: "Gute Zeiten, schlechte Zeiten"
  },
  {
    name: "Eckart von Hirschhausen",
    occupation: "moderator",
    catchPhrase: "Die Leber wächst mit ihren Aufgaben"
  },
  {
    name: "Jürgen Drews",
    occupation: "singer",
    catchPhrase: "unknown"
  }
]

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });