const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity.js');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let celebritySeeds = [
  {
    name: "RuPaul",
    occupation: "Drag Queen",
    catchPhrase: "Bring back my girls!"
  },
  {
    name: "Tofu-chan",
    occupation: "Motivational Speaker & Professional Pupper",
    catchPhrase: "Mina-san, konnichi wa!"
  },
  {
    name: "Arnold Schwarzenegger",
    occupation: "Actor, Bodybuilder, Politician",
    catchPhrase: "I'll be back"
  }
]

Celebrity.insertMany(celebritySeeds)
.then(celebritySeeds => {
  console.log(`Success! Added ${celebritySeeds.length} celebrities to the database.`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err)
})