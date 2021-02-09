const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const DB_NAME = 'lab-mongoose-movies'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const celebrities = [
  {
    name: 'Matthew McConaughey',
    occupation: 'Actor',
    catchPhrase: 'Alright, Alright, Alright'
  },
  {
    name: 'Sheldon Cooper',
    occupation: 'Actor',
    catchPhrase: 'Bazinga!'
  },
  {
    name: 'Heidi Klum',
    occupation: 'Model/Presenter',
    catchPhrase: 'Auf wiedersehen!'
  },
  {
    name: 'Oprah Winfrey',
    occupation: 'Talk Show Host',
    catchPhrase: 'Aha Moment!'
  },

]
Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));