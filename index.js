'use strict';
const mongoose = require('mongoose');
const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/movielog', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.err('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));