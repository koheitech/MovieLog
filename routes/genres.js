'use strict';

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  //throw new Error('pow pow pow pow');
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name});
  await genre.save();
  
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Update first approach
  const genre = await Genre.findByIdAndUpdate(
    req.params.id, 
    { name: req.body.name }, 
    { new: true } // option to return updated object, not original object
  );

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id);
  
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
  
  const genre = await Genre.findById(req.params.id);

  if (!genre) res.status(404).send('The genre is not found.');
  
  res.send(genre);
});


module.exports = router;