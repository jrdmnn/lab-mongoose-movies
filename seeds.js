const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity')

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [
  {
    name: 'Tom Cruise',
    occupation: 'actor',
    catchPhrase: 'Wathever Tom Cruise his catchPhrase is!'
  },
  {
    name: 'Beyonce',
    occupation: 'diva',
    catchPhrase: 'Who would know?'
  },
  {
    name: 'Daffy Duck',
    occupation: 'cartoon duck',
    catchPhrase: "It's rabbit season"
  }
]

Celebrity.insertMany(celebrities).then(celebrities => {
  console.log(`Good job, ${celebrities.length} celebrities are added`);
}).catch(err => {
  console.log(err);
})