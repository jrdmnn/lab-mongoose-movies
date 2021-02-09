const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
const Movie = require('./models/Movie') //main model now

//add connection to database

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {userNewUrlParser: true})

const celebrities = [
  {name: 'Madonna',
  occupation: 'Singer',
  catchPhrase: 'Look how overrated I am'
  },
  {name: 'Rihanna',
  occupation: 'Singer',
  catchPhrase: 'I secretly run the world'
  },
  {name: 'Lady Gaga',
  occupation: 'Philosopher',
  catchPhrase: 'I secretly run Rihanna'
  }
]

//insert celebrities in Model

Celebrity.insertMany(celebrities)
.then(celebrities=>{
  console.log(`You got it, dumbass! You added ${celebrities.length} celebrities to MongoDB`)
  mongoose.connection.close()
}).catch(err=>console.log(err))

//iterate over movie array, create celebrity& corresponding field 
//replace celebrity with ID

// movie.forEach(movie=>{
  // Celebrity.create(movie.celebrity)
  // .then(celebrityDB=>{
    // movie.celebrity = celebrityDB._id;
    // Movie.create(celebrity); 
  // })
// })
// 

//now we run the file!
