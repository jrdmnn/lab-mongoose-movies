const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  userNewUrlParser: true
});


const celebrity = [
{
  name: 'Tom Cruise',
  occupation: 'Actor',
  catchPhras: "Goose",
},
{
  name: 'Steve Jobs',
  occupation: 'Dead',
  catchPhras: "I'll do it",
},
{
  name: 'Marky Mark',
  occupation: 'Actor',
  catchPhras: "Sup",
}
]


Celebrity.create(celebrity)
  .then(celebrity => {
    console.log(`Success! Added ${celebrity.length} celebrities to the database.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });