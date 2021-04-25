const mongoose = require('mongoose');
const Celebrity = require("./models/Celebrity.model");

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  //useUnifiedTopology: true
});

let celebArr = [
  {
    name: "Steve Jobs",
    occupation: "former Apple CEO",
    catchPhrase: "Creativity is just connecting things."
  },
  {
    name: "Tim Berners-Lee",
    occupation: "software engineer",
    catchPhrase: "You affect the world by what you browse."
  },
  {
    name: "Don Norman",
    occupation: "design researcher",
    catchPhrase: "Fail often, fail fast."
  }
];

Celebrity.create(celebArr)
  .then(celebrity => console.log('The celebArr is saved and its value is:', celebrity))
  .catch(error => console.log('An error happened while saving the new user:', error));