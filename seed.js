const mongoose = require('mongoose')
const Celebrity = require('./models/Celebrity')
mongoose.connect('mongodb://localhost/lab-mongoose-movies', {userNewUrlParser: true})


const Celebs = [
  {
    name: 'celeb1',
    occupation: 'celebjob1',
    catchPhrase: 'catchphrase1'

  },
  {
    name: 'celeb2',
    occupation: 'celebjob2',
    catchPhrase: 'catchphrase2'

  },
  {
    name: 'celeb3',
    occupation: 'celebjob3',
    catchPhrase: 'catchphrase3'

  }
]

Celebrity.insertMany(Celebs)
.then(Celebs => {
  console.log(`You added ${Celebs.length} celebrities to MongoDB` )
  mongoose.connection.close()
}).catch(err=>console.log(err))