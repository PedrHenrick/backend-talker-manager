const express = require('express');
const { readFile, writeFile } = require('../utils/index');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  res.status(200).json(await readFile());
});

talkerRoute.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile();

  const newTalker = {
    name,
    age,
    id: Math.max(...talkers.map((talker) => talker.id)) + 1,
    talk,
  };

  talkers.push(newTalker);
  await writeFile(talkers);

  res.status(200).json({ message: 'Insert OK' });
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
