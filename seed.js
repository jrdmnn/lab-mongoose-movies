const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity');

mongoose
  .connect('mongodb://localhost/lab-mongoose-movies', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const celebrities = [
  {
    name: "Margot Robbie",
    occupation:"actress and producer",
    catchPhrase: "I made a conscious decision not to date actors"
   },
   {
    name: "Ryan Gosling",
    occupation:"actor",
    catchPhrase: "Sometimes I think that the one thing I love most about being an adult is the right to buy candy whenever and wherever I want."
   },
   {
    name: "Jake Gyllenhaal",
    occupation:" actor and producer",
    catchPhrase: "I admire actors and artists who devote just as much time to their life as they do to their work."
   },
]

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  }) 

  /* const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity');
//add connection to database
mongoose.connect('mongodb://localhost/lab-mongoose-movies', {userNewUrlParser: true})
const celebrities = [
  {name: 'Madonna',
  occupation: 'Singer',
  catchPhrase: 'Look how overrated I am'
  },
  {name: 'Rihanna',
  occupation: 'Singer',
  catchPhrase: 'I secretly run the world'
  },
  {name: 'Lady Gaga',
  occupation: 'Philosopher',
  catchPhrase: 'I secretly run Rihanna'
  }
]
//insert celebrities in Model
Celebrity.insertMany(celebrities)
.then(celebrities=>{
  console.log(`You got it, dumbass! You added ${celebrities.length} celebrities to MongoDB`)
  mongoose.connection.close()
}).catch(err=>console.log(err)) */