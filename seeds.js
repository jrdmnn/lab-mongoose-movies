const mongoose = require('mongoose');

const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const celebrities = [
    {
		name: "Tom Cruise",
		occupation: "actor",
	    catchPhrase: "something catchy"	
	},
	{
		name: "Beyonce",
		occupation: "singer",
	    catchPhrase: "nothing"
	},
    {
		name: "Daffy Duck",
		occupation: "actor",
	    catchPhrase: "pfpfpfpfpfpf"
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