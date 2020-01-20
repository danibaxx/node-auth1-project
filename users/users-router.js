const bcrypt = require('bcryptjs');
const express = require('express');
const usersModel = require('./users-model');

const router = express.Router()

function restricted() {
  const authErr = {
    message: 'Cannot pass go!'
  };

  return async (req, res, next) => {
    try {
      const { username, password } = req.headers;
      if (!username || !password) {
        return res.status(401).json(authErr)
      };

      const user = await usersModel.findBy({ username }).first()
      if (!user) {
        return res.status(401).json(authErr)
      };

      const pwValid = await bcrypt.compare(password, user.password)
      if (!pwValid) {
        return res.status(401).json(authErr)
      };

      next();

    } catch(err) {
      next(err)
    };
  };
};

router.get('/', restricted(), (req, res, next) => {
  try {
    const users = await usersModel.find()

    res.json(users)
  } catch(err) {
    next(err)
  }
});

module.exports = router;