const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/celebrities', {
  userNewUrlParser: true
});

const celebrities = [
    {
      name: "Poseidon",
      occupation: "swimmer",
      catchPhrase: "No hero is above fear, Percy. And you have risen above every hero."
    },
    {
      name: "Ares",
      occupation: "warrior",
      catchPhrase: "Only a fool would challenge me in my own game."
    },
    {
      name: "Diana",
      occupation: "hunter",
      catchPhrase: "Artemis of the wilderness (agrotera), lady of wild beasts (potnia theron)."
    }
];


  

  Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });