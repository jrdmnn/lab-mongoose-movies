const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity.js');


mongoose.connect('mongodb://localhost/library', {
  userNewUrlParser: true
});


const celebrities = [
  {
    name: "Lou Ferrigno",
    occupation: "Actor",
    catchPhrase:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Britney Spears",
    occupation: "Singer",
    catchPhrase: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Kourtney Kardashian",
    occupation: "Undefined",
    catchPhrase: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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