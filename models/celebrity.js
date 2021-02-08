const mongoose = require('mongoose');
/* const { Schema, model } = require("mongoose"); */
const Schema = mongoose.Schema

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const celebSchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
});

const Celebrity = mongoose.model("Celebrity", celebSchema);

module.exports = Celebrity;
