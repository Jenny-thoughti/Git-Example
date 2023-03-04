require('dotenv').config({});
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');


const PORT = process.env.APP_PORT || 3030;

const app = express();

// const whitelistedRoutes = require('./middlewares/authMiddleware');
// app.use(whitelistedRoutes.verify);

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

// passport: initialize
app.use(passport.initialize());
// passport: persistent login sessions
app.use(passport.session());

// require passport functions
require('./config/passport');

// Routes
const mainRouter = require('./routes');
app.use('/', mainRouter);


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

