const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const session = require('express-session');
const user = require('../models/user');

router.post('/', (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'Please submit right information',
    });
    return;
  }
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(user => {
    console.log(user);
    if (!user) {
      res.status(404).json({
        error: 'no user with that',
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, matched) => {
      if (matched) {
        req.session.user = user;
        res.status(200).json({ success: 'successfully logged in', user });
      } else {
        res.status(401).json({ error: 'incorrect information' });
      }
    });
  });
});

module.exports = router;
