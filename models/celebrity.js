const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhras: String,
});


const Celebrity = mongoose.model('celebrity', celebritySchema);
module.exports = Celebrity;