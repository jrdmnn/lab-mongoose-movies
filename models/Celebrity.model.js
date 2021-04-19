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
  imageURL: {
    type: String,
    default: "https://picsum.photos/600/450",
  }
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;