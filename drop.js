const mongoose = require('./db');

mongoose.connection.dropDatabase().then((_) => mongoose.connection.close());
