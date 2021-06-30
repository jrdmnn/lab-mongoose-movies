
require("dotenv/config");

const MONGO_URI = process.env.MONGODB_URI;

console.log(MONGO_URI)
const mongoose = require('mongoose');
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

const Celebrity = require('./models/celebrity');
const celebs = [
  {
    name: "Michael Jordan",
    occupation: "athlete",
    catchPhrase: "that's basketball, baby"
  },
  {
    name: "Fred Flinstone",
    occupation: "construction worker",
    catchPhrase: "yabba, dabba, doo!"
  },
  {
    name: "Ham Johnson",
    occupation: "actor",
    catchPhrase: "did somebody order ham?"
  }
]

Celebrity.insertMany(celebs)
  .then( celebs =>{
    console.log('success');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  })