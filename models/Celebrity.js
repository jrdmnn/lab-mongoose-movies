const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/*its a plan and some rules for the data structure, in this case a celebrity  */
const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
});

// Here we create the model. 
// With this we call the methods on to communicate with database
// 1.P name of the the model ( will always adds s to it)
const Celebrity = mongoose.model('Celebrity', celebritySchema);


module.exports = Celebrity;


