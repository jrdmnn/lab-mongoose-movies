const mongoose = require('mongoose');
const colors = require('colors');
const Celebrity = require('./models/Celebrity');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
    useNewUrlParser: true,
});

const celebrities = [
    {
        name: 'Tom Jones',
        occupation: 'singer',
        catchPhrase:
            'Love is in the air everywhere I look around. Love is in the air every sight and every sound.',
    },
    {
        name: 'Mina',
        occupation: 'singer',
        catchPhrase:
            "L'arma più certa per garantire il perpetuarsi della nostra illusione di libertà è tenerci nella paura sventolando gli incubi dei futuri bui.",
    },
    {
        name: 'Elvis Costello',
        occupation: 'singer',
        catchPhrase: 'I used to be disgusted; now I try to be amused.',
    },
    {
        name: 'Leonardo Di Caprio',
        occupation: 'actor',
        catchPhrase:
            "If you can do what you do best and be happy, you're further along in life than most people.",
    },
    {
        name: 'Christopher Lambert',
        occupation: 'actor',
        catchPhrase: 'There can be only one!',
    },
    {
        name: 'Joe Rogan',
        occupation: 'comedian',
        catchPhrase:
            "Aspire to be the man you pretend to be when you're trying to get laid.",
    },
];

let movies = [
    {
        title: 'The Shawshank Redemption',
        year: 1994,
        director: 'Frank Darabont',
        // genre: ['Crime', 'Drama'],
        plot:
            'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        cast: {},
    },

    {
        title: 'The Godfather',
        year: 1972,
        director: 'Francis Ford Coppola',
        // genre: ['Crime', 'Drama'],
        plot:
            'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        cast: {},
    },
    {
        title: 'The Godfather: Part II',
        year: 1974,
        director: 'Francis Ford Coppola',
        // genre: ['Crime', 'Drama'],
        plot:
            'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
        cast: {},
    },

    {
        title: 'The Dark Knight',
        year: 2008,
        director: 'Christopher Nolan',
        // genre: ['Action', 'Crime', 'Drama', 'Thriller'],
        plot:
            'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        cast: {},
    },
    {
        title: '12 Angry Men',
        year: 1957,
        director: 'Sidney Lumet',
        // genre: ['Crime', 'Drama'],
        plot:
            'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
        cast: {},
    },
    {
        title: 'Schindler"s List',
        year: 1993,
        director: 'Steven Spielberg',
        // genre: ['Biography', 'Drama', 'History'],
        plot:
            'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
        cast: {},
    },
    {
        title: 'Pulp Fiction',
        year: 1994,
        director: 'Quentin Tarantino',
        // genre: ['Crime', 'Drama'],
        plot:
            'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        cast: {},
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
        director: 'Peter Jackson',
        // genre: ['Drama', 'History'],
        plot:
            "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        cast: {},
    },
    {
        title: 'Il buono, il brutto, il cattivo',
        year: 1966,
        director: 'Sergio Leone',
        // genre: ['Western'],
        plot:
            'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
        cast: {},
    },
    {
        title: 'Fight Club',
        year: 1999,
        director: 'David Fincher',

        // genre: ['Drama'],
        plot:
            'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
        cast: {},
    },
];

Celebrity.insertMany(celebrities)
    .then((resp) => {
        console.log(
            `Success! Added ${resp.length} celebrities to the database`.inverse
                .green
        );
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
Movie.insertMany(movies)
    .then((resp) => {
        console.log(
            `Success! Added ${resp.length} movies to the database`.inverse.green
        );
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
