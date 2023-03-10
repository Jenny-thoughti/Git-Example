require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./config/passport');

const app = express();
const PORT = process.env.APP_PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

// passport: initialize & persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
const mainRouter = require('./routes');

app.use('/', mainRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
