const mongoose = require("mongoose");
// Just a test const Celeb = require('../models/celebrity.js');

mongoose.connect("mongodb://localhost/lab-mongoose-movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

/*
const tester = [
{ name: 'Daniel Day Lewis',
  occupation: 'Actor',
  catchPhrase: 'Howdie Partner'
}, {
  name: 'Dave Chapelle',
  occupation: 'Comedian',
  catchPhrase: 'This aint your couch'
}, {
  name: 'James Gandolfini',
  occupation: 'Actor',
  catchPhrase: 'Damn You'
}];

Celeb.insertMany(tester).then((celebData) => {
  console.log(celebData)
}).catch((error)=> {
  console.log(error)
})
*/