const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrity = [
  {
    name: "Tom Criuse",
    occupation: "actor",
    catchPhrase: "He can do the impossible"
  },
  {
    name: "Berti Voigts",
    occupation: "soccer player",
    catchPhrase: "He is called the Terrier"
  },
  {
    name: "Madonna",
    occupation: "singer",
    catchPhrase: "The queen of pop"
  },
]

Celebrity.insertMany(celebrity)
.then(celebrity =>{
  console.log(`Success! Added ${celebrity.length} celebrities to the database`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err)
})