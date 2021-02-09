const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost/celebrity', {
  useNewUrlParser: true
});

const celebrities = [
  {
    name: "Helene Fischer",
    occupation: "Singer",
    catchPhrase: "Durch die Nacht."
  },

  {
    name: "Die Kastelruther Spatzen",
    occupation: "Singer",
    catchPhrase: "Jodeli Jodelhu."
  },

  {
    name: "Wildecker Herzbuben",
    occupation: "Singer",
    catchPhrase: "Herzilein."
  },
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database.`);

  })
  .catch(error => console.log(error)); 

// books.forEach(movie => {
//   Celebrity.create(book.author).then(dbAuthor => {
//     book.author = dbAuthor._id;
//     Book.create(book)
//   })
// })