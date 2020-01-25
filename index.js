const express = require('express');
const session = require('express-session');
// add routers
const authRouter = require('./auth/auth-router');
const usersRouter = require("./users/users-router");

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "lets keep it a secret, and safe!",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}))
// add server uses with routers
server.use('/auth', authRouter);
server.use('/users', usersRouter);

server.get('/', (req, res, next) => {
  res.json({
    message: "Welcome to User's API"
  })
});

server.use((err, req, res, next) => {
  console.log("Error:", err)

  res.json(500).json({
    message: "You shall not pass!"
  })
});

server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} \n`)
});