const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/Celebrity', {
  userNewUrlParser: true
});

const celebrities = [
  {
    name: "Khabib Nurmagomedov",
    occupation: "UFC Figther",
    catchPhrase: "I don't fight for money. I fight for my legacy. I fight for history. I fight for my people"
  },
  {
    name: "Sadhguru",
    occupation: "Yogi",
    catchPhrase: "A World full of love, light and laughter- its time has come. Let's make it happen."
  },
  {
    name: "Zlatan Ibrahimovic",
    occupation: "Footballer",
    catchPhrase: "I am Zlatan"
  },
  {
    name: "Caetano Veloso",
    occupation: "Musician",
    catchPhrase: "Everybody knows that our cities were built to be destroyed."
  },
  {
    name: "Steve Jobs",
    occupation: "Entrepreneur",
    catchPhrase: "Think Different."
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
