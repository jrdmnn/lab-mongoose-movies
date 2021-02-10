
const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

// here is theconnection / name  of the database
// this adding the Database auto. 
mongoose.connect('mongodb://localhost/celebrities', {
  userNewUrlParser: true
});
 
const celebrity = [
  {
    name: "celebrity1",
    occupation:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      catchPhrase: "Suzanne Collins"
  },
  {
    name: "celebrity2",
    occupation:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      catchPhrase: "Suzanne Collins"
 
  },
  {
    name: "celebrity3",
    occupation:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      catchPhrase: "Suzanne Collins"
  }
];


// to create something 
//get an obj. as a p
 
// Celebrity.create()or Celebrity.insertMany()

