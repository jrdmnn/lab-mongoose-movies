const mongoose = require("mongoose");
const Celebrity = require("./models/Celebrity.model");
require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrity = [
  {
    name: "Maria",
    occupation: "actress",
    catchPhrase: "Hello, what's up?",
  },
  {
    name: "Jorge",
    occupation: "singer",
    catchPhrase: "Bye, what's up?",
  },
  {
    name: "sam",
    occupation: "politician",
    catchPhrase: "Ciao, what's up?",
  },
];

Celebrity.insertMany(celebrity)
  .then((celeb) => {
    console.log(`Success! Added ${celeb.length} Celebrities to the database`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
