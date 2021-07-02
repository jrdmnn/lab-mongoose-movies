const mongoose = require('mongoose');

const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/celebrities', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const celebrities = [
  {
    name: "Ivy Queen",
    occupation: "Reggeatonera",
    catchPhrase: "Yo quiero bailar!",
  },
  
  {
    name: "Cardi B",
    occupation: "Rapper",
    catchPhrase: "Okurrr.",
  },

  {
    name: "Chavela Vargas",
    occupation: "Singer",
    catchPhrase: "Si el amor no se ve ni se siente, no existe o no te sirve.",
  }
]

Celebrity.insertMany(celebrities)
.then(celebrities => {
  console.log(`Success! Added ${celebrities.length} celebrities to the database`)
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
})