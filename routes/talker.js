const express = require('express');
const { validateAuth } = require('../middleware/validateAuth');
const { validateTalkers } = require('../middleware/validateTalkers');
const { readFile, writeFile } = require('../utils/index');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  res.status(200).json(await readFile());
});

talkerRoute.post('/', validateAuth, validateTalkers, async (req, res) => {
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

  res.status(201).json(newTalker);
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

talkerRoute.put('/:id', validateAuth, validateTalkers, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readFile();

  const searchedTalker = talkers.find((talker) => talker.id === Number(id));
  if (!searchedTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  const attTalker = { ...searchedTalker, name, age, talk };
  talkers.splice(talkers.indexOf(searchedTalker), 1, attTalker);

  await writeFile(talkers);
  res.status(200).json(attTalker);
});

module.exports = talkerRoute;
