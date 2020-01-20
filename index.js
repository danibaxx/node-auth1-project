const express = require('express');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.get('/', (req, res, next) => {
  res.json({
    message: "Welcome to User's API"
  })
});

server.use((err, req, res, next) => {
  console.log("Error:", err)

  res.json(500).json({
    message: "Something went wrong!"
  })
});

server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} \n`)
});