const mongoose = require("mongoose");
const Celebrity = require("./models/Celebrity");
 
const DB_NAME = "lab-mongoose-movies";

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: "Giulia Baile",
    occupation: "Actress",
    catchPhrase: "Every woman is an actress.",
  },
  {
    name: "Winter",
    occupation: "DJ",
    catchPhrase: "It's a lifestyle.",
  },
  {
    name: "Natalie Dupont",
    occupation: "Designer",
    catchPhrase: "Simple is timeless.",
  }
]

Celebrity.create(celebrities)
  .then(celebrities => {
    console.log(`Created ${celebrities.length} celebrities`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));