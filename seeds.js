const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity'); 

const DB_NAME = 'lab-mongoose-movies';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useNewUrlParser: true
}); 


const celebrities = [
  {
    name: "Vincent Cassel",
    occupation: "actor and director", 
    catchPhrase: "You can't escape from what you are"
  }, 
  {
    name: "Ryan Gosling",
    occupation: "actor, producer, director and musician ", 
    catchPhrase: "You feel good if you've done hard work. You sleep better. You get stuck in your head if you have too much time to think."
  }, 
  {
    name: "Joanie Lemercier",
    occupation: "audio-visual artits", 
    catchPhrase: "The machine is like an extension of my arm, it draws tirelessly with great precision, and allows iterations, while the slow process of lying the ink on the paper meets the temporarily of the subject"
  }
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} books to the database.`); 

    mongoose.connection.close();
    })
  .catch(err => console.log(`Error message ${err}`)); 