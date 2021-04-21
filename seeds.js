const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPhrase: "Nothing ends nicely, that's why it ends."
  },
  {
    name: "Beyonce",
    occupation: "Singer",
    catchPhrase: "All the single ladies. All the single ladies."
  },
  {
    name: "Daffy Duck",
    occupation: "Comedian",
    catchPhrase: "Youuu're deththpicable!"
  }
]

Celebrity.insertMany(celebrities)
.then(celebrities => {
  console.log(`Success! Added ${celebrities.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch(err => { 
    console.log(err)
})