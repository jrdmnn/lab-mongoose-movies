const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrity = [
  {
    name: "Jennifer Aniston",
    occupation: "actress",
    catchPhrase: "Rachel from Friends"
  },
  {
    name: "Michael Jackson",
    occupation: "singer",
    catchPhrase: "Famous pedophile"
  },
  {
    name: "Ladytron",
    occupation: "band",
    catchPhrase: "Nice music"
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