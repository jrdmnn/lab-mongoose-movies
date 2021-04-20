require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);

app.locals.title = `Celebrities App`;

app.use("/", require("./routes/index"));
app.use("/celebrities", require("./routes/celebrities"));
app.use("/movies", require("./routes/movies"));

require("./error-handling")(app);

module.exports = app;
