// Import dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Configure routes
const routes = require('./controllers');

// Set up database connection
const sequelize = require('./config/connection');

// Set up handlebars engine
const hbs = exphbs.create({});

// Set up app and port
const app = express();
const PORT = process.env.PORT || 3001;

// Configure handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure static routes
app.use(express.static(path.join(__dirname, 'public')));

// Use the controllers middleware
app.use(routes);

// Sync the database and start the app
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
});