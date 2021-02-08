const mongoose = require('mongoose');

const Celebrity = require("./models/Celebrity");

mongoose.connect("mongodb://localhost/lab-mongoose-movies", {
  userNewUrlParser: true
});


const celebrities = [{
  name: "Frank Berzbach",
  occupation: "Author",
  catchPhrase: "Wer schweigen kann, spricht viel bewusster, und wer loslassen kann und zum Nichtstun fähig ist, handelt sehr viel bewusster"
},
{
  name: "Hermann Hesse",
  occupation: "Author",
  catchPhrase: "Some of us think holding on makes us strong but sometimes it is letting go"
},
{
  name: "Matthias Claudius",
  occupation: "poet",
  catchPhrase: "Sage nicht alles, was du weißt, aber wisse alles, was du sagst"
}
]


Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities} to the database.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
