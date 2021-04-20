const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: "Bono",
    occupation: "singer/activist",
    catchphrase: "Save the Whales"
  },
  {
    name: "Kurt Cobain",
    occupation: "musician",
    catchphrase: "Is this shotgun loaded?"
  },
  {
    name: "Britney Spears",
    occupation: "singer/dancer",
    catchphrase: "please send help"
  }
]

Celebrity.insertMany(celebrities)
  .then(celebs => {
    console.log(`Success! Added ${celebrities.length} to the db`);
    mongoose.connection.close();
  }).catch(err => {
    console.log('Error', err);
  });
