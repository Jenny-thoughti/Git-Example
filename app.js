require('dotenv').config({});
const express = require('express');

const PORT = process.env.APP_PORT || 3030;

const app = express();

app.use(express.json());

// Routes
const mainRouter = require('./routes');
app.use('/', mainRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

