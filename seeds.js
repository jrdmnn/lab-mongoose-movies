// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

const Celebrity = require('./models/Celebrity');

const initialCelebritiesData = [
  {
    name: 'Tom Hanks',
    occupation: 'Actor',
    catchPhrase: 'Friend to all',
  },
  {
    name: 'George Clooney',
    occupation: 'Actor',
    catchPhrase: 'Maried to Amal',
  },
  {
    name: 'Kate Blanchett',
    occupation: 'Actor',
    catchPhrase: 'Can do it all',
  },
];

Celebrity.insertMany(initialCelebritiesData)
  .then((insertedData) => {
    console.log(`Success! Added ${insertedData.length} to the database`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
