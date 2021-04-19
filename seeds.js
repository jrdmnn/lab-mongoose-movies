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
    catchPhrase: 'Soy poeta pero no olvido',
    imageURL: "https://www.hoyesarte.com/wp-content/uploads/2014/02/octavio_paz3.jpg"
  },
  {
    name: 'John Lennon',
    occupation: 'Musician',
    catchPhrase: 'All you need is love',
    imageURL: "https://images.impresa.pt/blitz/2020-08-28-john-lennon.jpg/original/mw-860"
  },
  {
    name: 'Tofu Chan',
    occupation: 'Motivational dog',
    catchPhrase: 'Woof woof',
    imageURL: "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/tofu-in-glasses.jpg?itok=MRZgv_TD&mtime=1567661527"
  }
]

Celebrity.insertMany(celebrities)
  .then(() => {
    console.log('initial celebrities inserted into the DB')
    console.log("Now closing the conection")
    mongoose.connection.close();
  })
  .catch(err => console.log(err))
