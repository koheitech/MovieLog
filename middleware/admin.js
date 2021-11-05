'use strict';

module.exports = function (req, res, next) {
  // 401 Unauthorized (for invalid token)
  // 403 Forbidden (for forbidden privilege)
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
};