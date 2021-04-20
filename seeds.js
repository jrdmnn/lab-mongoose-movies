const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const celebrities = [
  {
    name: "Paris Hilton",
    occupation: "Born rich",
    catchPhrase: "That's hot",
  },
  {
    name: "Britney Spears",
    occupation: "Singer",
    catchPhrase: "It's Britney, B*tch!",
  },
  {
    name: "Shia LaBeouf",
    occupation: "Actor",
    catchPhrase: "DO IT!",
  },
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  })
