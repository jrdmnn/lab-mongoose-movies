// this file was just to run once at beginning to seed the database (fill it with some data). 
// Probably don't need it again.



// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-mongoose-movies";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


const Celebrity = require("./models/Celebrity")


const celebrities = [
  {
    name: "Boaty McBoatface", 
    occupation: 'being a boat',
    catchPhrase: 'Only in Britain...'
  },
  {
    name: 'my mate adam',
    occupation: 'unknown',
    catchPhrase: "It's all Guchi Mane, brah"
  },
  {
    name: 'roadrunner',
    occupation: 'fucking with coyotes',
    catchPhrase: 'Meep,meep'
  }
]


// Celebrity.create(celebrities[0])
// .then(celebritiesData => console.log(celebritiesData))
// .catch(error => console.log(error))


Celebrity.create(celebrities)
  .then(celebritiesData => {console.log(celebritiesData)})
  .catch(error => console.log(error))


// Celebrity.find()
//   .then(celebs => {
//     celebs.forEach(celeb =>console.log(celeb));
  
//   })