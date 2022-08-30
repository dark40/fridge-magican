const path = require('path');
<<<<<<< HEAD

// Require models
const { user, fridge, recipe, ingredient } = require('./models');

// Configure routes
=======
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
>>>>>>> f17d153cf752b214d5c0ff8b5382e59c4130cda5
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

<<<<<<< HEAD
// Use json and urlecoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure static routes
=======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
>>>>>>> f17d153cf752b214d5c0ff8b5382e59c4130cda5
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Sync the database and start the app
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
});