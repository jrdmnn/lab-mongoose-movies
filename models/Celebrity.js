const mongoose = require('mongoose');
//create a schema
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
})


// make model

const Celebrity = mongoose.model('Celebrity', celebritySchema)

module.exports = Celebrity;