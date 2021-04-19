const mongoose = require("mongoose")
const Celebrity = require("./models/Celebrity")

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebritiesList = [{
    name: 'Bob Marley',
    occupation: 'Musician',
    catchPhrase: 'I shot the Sheriff'
  },
  {
    name: 'Hannibal Lecter',
    occupation: 'Forensic Psychiatrist',
    catchPhrase: 'Holidays are the best. I couldn’t imagine being from a small family.'
  },
  {
    name: 'Winston Wolf',
    occupation: 'Cleaner',
    catchPhrase: 'I solve problems'
  }
]

Celebrity.insertMany(celebritiesList)
  .then(celebritiesList => {
    console.log(`Success! Added ${celebritiesList.length} celebrities to the database`)
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  })