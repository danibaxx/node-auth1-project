const bcrypt = require('bcryptjs');
const express = require('express');
const usersModel = require('../users/users-model');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const saved = await usersModel.add(req.body)

    res.status(201).json(saved)
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.findBy({ username }).first();
    const pwValid = await bcrypt.compare(password, user.password);

    if (user && pwValid) {
      req.session.user = user
      res.status(200).json({
        message: "Logged in",
      })
    } else {
      res.status(401).json({
        message: 'You shall not pass!'
      })
    }
  } catch(err) {
    next(err)
  }
});

router.get('/protected', async (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(403).json({
        message: 'You shall not pass!'
      })
    }
    res.json({
      message: 'Logged in'
    })
  } catch(err) {
    next(err)
  }
});

module.exports = router;