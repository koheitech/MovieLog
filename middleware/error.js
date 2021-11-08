module.exports = function(err, req, res, next){
  // Error middleware for logging exception
  res.status(500).send('Something failed.');
}