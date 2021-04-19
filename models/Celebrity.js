const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the Celebrity model to whatever makes sense in this case
const CelebritySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  occupation: String,
  catchPhrase: String,
});

const Celebrity = model('Celebrity', CelebritySchema);

module.exports = Celebrity;
