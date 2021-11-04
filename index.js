'use strict';
const express = require('express');
const app = express();


// demo database TO BE deleted
const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },  
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('The genre is not found.');
  res.send(
    `The genre is found!
    genre ID: ${genre.id}
    genre name: ${genre.name}`
    );
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));