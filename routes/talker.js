const express = require('express');
const { readFile } = require('../utils/index');

const talker = express.Router();

talker.get('/', async (_req, res) => {
  res.status(200).json(await readFile());
});

module.exports = talker;
