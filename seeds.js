const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity')

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//populate with data and run the node seeds.js file = compass would be updated.
//then rerun the server npm run dev to see the updates
let arrayCelebrities = [
    {
    name: 'Superman',
    occupation: 'Flying around',
    catchPhrase: 'call me God'},

    {
    name: 'Jan',
    occupation: 'Awesome developer',
    catchPhrase: 'Do you feel overwhelmed ?'},
    
    {
    name: 'Emperor Palpatine',
    occupation: 'Scheming malevolent plans',
    catchPhrase: 'I am the Senate !'}
]

Celebrity.create(arrayCelebrities)
    .then(arrayCelebrities => {
        console.log('The data were sent to the database', arrayCelebrities);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err)
    })