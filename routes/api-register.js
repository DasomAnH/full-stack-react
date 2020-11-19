const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('register', {
    partials: {
      head: '/partial/head',
    },
    locals: {
      title: 'register',
      error: null,
    },
  });
});

router.post('/', (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'please submit all required fields',
    });
    return;
  }
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    console.log('User', password, hash);
    models.User.create({
      name: name,
      email: email,
      password: hash,
    })
      .then(user => {
        res.json({
          success: 'register',
          user,
        });
      })
      .catch(e => {
        res.status(400).json({ error: 'email already in used' });
      });
  });
});

module.exports = router;
