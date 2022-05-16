const express = require('express');
const { readFile } = require('../utils/index');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  res.status(200).json(await readFile());
});

talkerRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();

  const searchedTalker = talkers.find((talker) => talker.id === Number(id));
  
  if (!searchedTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(searchedTalker);
});

module.exports = talkerRoute;
