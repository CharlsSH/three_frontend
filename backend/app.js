const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/test.api');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/test', usersRouter);

module.exports = app;