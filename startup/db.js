'use strict';

const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/movielog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => winston.info('Connected to MongoDB...'));
};