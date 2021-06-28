const mongoose = require('mongoose');
const Celebrity = require("./models/Celebrity");

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const celebrities = [
	{
		name: "Roger Federer",
		occupation: "Athlete",
		catchPhrase: "blah blah blah"
	},
	{
		name: "Ariana Grande",
		occupation: "Singer",
		catchPhrase: "la la la"
	},
    {
		name: "Ben Affleck",
		occupation: "Actor",
		catchPhrase: "Was Pearl Harbor a good movie?"
	}
]


Celebrity.insertMany(celebrities)
.then(celebrities => {
    console.log(`Success! Added ${celebrities.length} books to the database`)
    mongoose.connection.close();
})
.catch(err => {
    console.log(err);
})
