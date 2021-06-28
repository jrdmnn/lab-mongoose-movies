// const mongoose = require('mongoose');

// const Celebrity = require('./models/Celebrity');

// mongoose.connect('mongodb://localhost/celebrities', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });

// const celebritiesSchema = [
//   {name: "Kris Jenner",
//   occupation: "?",
//   catchPhrase:"Kim, would you stop taking pictures of yourself? Your sister's going to jail",
// },
// {name: "Kylie Jenner",
//   occupation: "?",
//   catchPhrase:"I feel like every year has a new energy. And I feel like this year is really about like, the year of realising stuff… Everyone around me, we’re all just realising things.",
// },
// {name: "Kim Kardashian",
//   occupation: "?",
//   catchPhrase:"I had dinner with Obama once, and he just seemed very firm about the change, and that’s, like, his motto",
// }
// ]

// Celebrity.insertMany(celebritiesSchema)
//   .then(celebrities => {
//     console.log(`Success! Added ${celebrities.length} celebrities to the database`)
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.log(err);
//   })
