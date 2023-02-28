require('dotenv').config({});
const express = require('express');

const PORT = process.env.APP_PORT || 3030;

const app = express();

app.use(express.json())

//Users
const routes = require('./routes/usersRouter');
app.use('/users', routes);

//Posts
const postsroutes = require('./routes/postsRouter');
app.use('/posts', postsroutes)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

