const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

// The .model() function makes a copy of schema
const Celebrity = mongoose.model('Celebrity', celebritySchema)

module.exports = Celebrity;