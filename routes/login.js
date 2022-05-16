const express = require('express');
const { validateLogin } = require('../middleware/validateLogin');
const { generateToken } = require('../utils');

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, async (_req, res) => {
  // const { email, password } = req.body;

  const token = generateToken(8);

  res.status(200).json({ token });
});

module.exports = loginRoute;
