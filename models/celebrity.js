const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const celebrityModel = new Schema({
	name: String,
	occupation: {
        type: String,
        enum: [ 'actor', 'singer', 'comedian', 'unknown']
    },
	catchPhrase: String,
});

const Celebrity = mongoose.model('Celebrity', celebrityModel);
module.exports = Celebrity;