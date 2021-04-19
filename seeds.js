const mongoose = require('mongoose');
const Celebrity = require('./models/celebrities');

mongoose.connect("mongodb://localhost/lab-mongoose-movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [{
  name: 'Tom Waits',
  occupation: 'allrounder',
  catchPhrase: "i haven't had a drink in 20 years"
}, {
  name: 'Nick Cave',
  occupation: 'musician',
  catchPhrase: "i haven't had a drink in 20 years"
}, {
  name: 'Wim Wenders',
  occupation: 'film',
  catchPhrase: "i'm doing films"
}]

Celebrity.insertMany(celebrities)
  .then(celebritys => {
    console.log(`you've added ${celebrities.length} celebritys`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  })