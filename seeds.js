const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/celebrities', {
  userNewUrlParser: true
});


const celebrities = [
  {
    name: "superwoman",
    occupation: "heroine",
    catchPhrase: "I'm here for you!"
  },
    {
    name: "Climate Saviour",
    occupation: "changemaker",
    catchPhrase: "I'll save the Earth!"
  },
      {
    name: "Mrs Perfect",
    occupation: "politician",
    catchPhrase: "Trust me!"
}

]

Celebrity.create(celebrities)
  .then(celebrity => {
    console.log(celebrity);
    mongoose.connection.close();
        }).catch(err => {
    console.log(err);
  })