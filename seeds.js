const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/celebrity', {
  useNewUrlParser: true
});

const celebrities = [
  {
    name: "Weed, the Superman",
    occupation: "Superhero",
    catchPhrase: "Make the world addicted to me. If they lose their minds, I will save them all"
  },
  {
    name: "The Joker",
    occupation: "Anti-hero",
    catchPhrase: "Hahahahahahahahahahahaha! You all have to pay your own price"
  },
  {
    name: "Snowman",
    occupation: "Fiction character",
    catchPhrase: "Human, come and build me up"
  }
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database.`);
    
  })
  .catch(error => console.log(error));