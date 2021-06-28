require("dotenv/config");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    // remove all entries
    // return Celebrity.deleteMany();
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const Celebrity = require('./models/Celebrity');

const celebrities = [
	{
		name: "Al Pacino",
    occupation: "actor",
		catchPhrase: "Say hello to my little friend!"
	},
	{
		name: "Marlon Brando",
    occupation: "actor",
		catchPhrase: "I'm gonna make him an offer he can't refuse."
  },
	{
		name: "Arnold Schwarzenegger",
    occupation: "actor, politician, bodybuilder",
		catchPhrase: "Hasta la vista, baby!"
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