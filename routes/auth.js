'use strict';
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');
  /*  We intentionally send "400" error, not "404" error
   *  because we do not want to give client the specific error info.
   *  That can give cracker a hint to crack into the app.
   */

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey'); // SECRET TO BE REMOVED
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;