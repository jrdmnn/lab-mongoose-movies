const mongoose = require("mongoose");
const Celebrity = require("./models/celebrity.js");

mongoose.connect(`mongodb://localhost/lab-mongoose-movies`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let celebrities = [
  {
    name: "Scarlett Johansson",
    occupation: "Actress",
    catchPhrase: "I believe that luck is opportunity meeting preparation.",
  },
  {
    name: "Leonardo di Caprio",
    occupation: "Actor",
    catchPhrase:
      "If you have done the very best you can. worrying won't make it any better. if you want to be successful, respect one rule!",
  },

  {
    name: "Shakira",
    occupation: "Singer",
    catchPhrase: "In this life, to earn your place you have to fight for it",
  },
];

Celebrity.insertMany(celebrities)
  .then((celebrities) => {
    console.log(
      `Success! Added ${celebrities.length} celebrities to the database`
    );
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(
      `An error occurred while creating celebrities from the DB: ${err}`
    )
  );
