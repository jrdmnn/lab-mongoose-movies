const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies',{
useNewUrlParser: true,
useUnifiedTopology: true
});

const celebrities = [{
    name: 'Penny Rimbaud',
    occupation: 'Singer',
    catchPhrase: 'no authority but yourself'
  },
  {
    name: 'Hidetaka Miyazaki',
    occupation: 'Game Designer',
    catchPhrase: "Ever since Demon's Souls I've really been pursuing making games that give players a sense of accomplishment by overcoming tremendous odds."
  },
  {
    name: 'Jim Dodge',
    occupation: 'Writer',
    catchPhrase: "Anarchy doesn't mean out of control, it means out of their control."
  }
];

Celebrity.create(celebrities)
.then(celebrities => {
  console.log(`Added ${celebrities.length} celebrities to the database`);
  mongoose.connection.close();
})
.catch(err=>{
  console.log(err)
}); 