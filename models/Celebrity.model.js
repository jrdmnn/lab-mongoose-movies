const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const User = model("User", userSchema);

module.exports = User;