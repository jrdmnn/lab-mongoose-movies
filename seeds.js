const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity.model')

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connection established with the DB')
  })
  .catch(err => console.log(err))

const celebrities = [
  {
    name: 'Octavio Paz',
    occupation: 'Writer',
    catchPhrase: 'Soy poeta pero no olvido'
  },
  {
    name: 'John Lennon',
    occupation: 'Musician',
    catchPhrase: 'All you need is love'
  },
  {
    name: 'Tofu Chan',
    occupation: 'Motivational dog',
    catchPhrase: 'Woof woof'
  }
]

Celebrity.insertMany(celebrities)
  .then(() => {
    console.log('initial celebrities inserted into the DB')
    console.log("Now closing the conection")
    mongoose.connection.close();
  })
  .catch(err => console.log(err))