const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/celebrities`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Celebrity = require("./models/celebrity")

const topCelebrities = [
  {
    name: "Parzival",
    occupation: "gunter",
    catchPhrase: "Jousting the lych"
  },
  {
    name: "Art3mis",
    occupation: "gunter",
    catchPhrase: "Professional writer"
  },
  {
    name: "Aech",
    occupation: "gunter",
    catchPhrase: "Cheshire grin"
  },
]

Celebrity.insertMany(topCelebrities)
.then(createdCelebrities => {
  console.log(`The following celebrities were just created: ${createdCelebrities}`)
})
.catch(err => console.log(err))