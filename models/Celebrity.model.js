const mongoose = require('mongoose');

const celebritySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  occupation: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;