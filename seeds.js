const mongoose = require('mongoose');
const Celebrity = require("./models/Celebrity");
const Movie = require("./models/Movie");

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

const movies = [
	{
		title: "",
		genre: "",
		plot: "",
		cast: ""
	}
]

Movie.insertMany(movies).then(movies => {
    console.log(`Success! Added ${movies.length} books to the database`)
})
.catch(err => {
    console.log(err);
})

Celebrity.insertMany(celebrities)
.then(celebrities => {
    console.log(`Success! Added ${celebrities.length} books to the database`)
    mongoose.connection.close();
})
.catch(err => {
    console.log(err);
})
