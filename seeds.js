const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  userNewUrlParser: true
});

const celebrities = [
  {
    name: "Meryl Streep",
    occupation: "actress",
      catchPhrase: "You can't get spoiled if you do your own ironing."
  },
  {
    name: "Roger Federer",
    occupation: "tennis player",
      catchPhrase: "When you do something best in life, you don’t really want to give that up, and for me it’s tennis."
  },
  {
    name: "Van Morrison",
    occupation: "singer song-writer",
      catchPhrase: "Music is spiritual. The music business is not."
  },
  {
    name: "Valentino Rossi",
    occupation: "moto racer",
      catchPhrase: "The speed is something dangerous but very exciting."
  },
  {
    name: "Martin Lther King",
    occupation: "civil right activist",
      catchPhrase: "Our lives begin to end the day we become silent about things that matter."
  }
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Added ${celebrities.length} celebrities to the database.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });