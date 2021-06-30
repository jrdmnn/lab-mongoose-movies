
const mongoose = require('mongoose');

const Celebrity = require('./models/celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const celebrities = [
	{
		name: "Christian Bale",
		occupation:	"actor",
		catchPhrase: "I tend to think you're fearless when you recognize why you should be scared of things, but do them anyway."
	},
	{
		name: "Adele",
		occupation: "singer",
    catchPhrase: "I’ve never seen magazine covers or music videos and been like, ‘I need to look like that to be a success."
	},
	{
		name: "Serdar Somuncu",
		occupation: "comedian",
    catchPhrase: "JEDE MINDERHEIT HAT EIN RECHT AUF DISKRIMINIERUNG"
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