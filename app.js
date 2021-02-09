require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

const express = require('express');
const pug = require('pug');
const app = express();

require('./config')(app);

// IMPORT ROUTES
const celebrityRoutes = require('./routes/celebrityRoutes');
const movieRoutes = require('./routes/movieRoutes');

// 👇 Start handling routes here
const index = require('./routes/index');

app.use('/', index);

app.use('/celebrities', celebrityRoutes);
app.use('/movies', movieRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
