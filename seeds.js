const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-mongoose-movies";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const celebrities = [
  {
    name: "Buffest Buffy",
    occupation: "Vampire Slayer",
    catchPhrase: "Stake first, ask questions later."
  },
  {
    name: "Curious Cat",
    occupation: "Explorer",
    catchPhrase: "Curiosity killed the cat but satisfaction brought it back."
  },
  {
    name: "Snazzy Snake",
    occupation: "Political Squeezer",
    catchPhrase: "Where is my vaccine?"
  }
]

Celebrity.insertMany(celebrities)
  .then(celebrity => {
    console.log(celebrity);
    mongoose.connection.close();
  })
  .catch(err =>{
    console.log(err)
  })