// I read on the student portal this should go on bin but on the portal was used the Irongeneraton. So I will create this here for now

const mongoose = require('mongoose');
const Celebrity = require('./celebrity');
 
mongoose.connect('mongodb://localhost/celebrity', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

const celebrities = [
  {
    name: 'Celeb1',
    occupation: 'Occup1',
    catchPrase: 'catchPrase1',
  },
  {
    name: 'Celeb2',
    occupation: 'Occup2',
    catchPrase: 'catchPrase2',
  },
  {
    name: 'Celeb3',
    occupation: 'Occup3',
    catchPrase: 'catchPrase3',
  }
];

Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));