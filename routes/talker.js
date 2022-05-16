const express = require('express');
const { readFile } = require('../utils/index');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  res.status(200).json(await readFile());
});

module.exports = talkerRoute;
