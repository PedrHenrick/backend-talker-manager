const fs = require('fs/promises');
const crypto = require('crypto');

const readFile = async () => {
  const content = await fs.readFile('talker.json', 'utf-8');

  return JSON.parse(content);
};

const writeFile = async (content) => {
  await fs.writeFile('task.json', JSON.stringify(content), 'utf-8');
};

const generateToken = (bites) => crypto.randomBytes(bites).toString('hex');

module.exports = generateToken;

module.exports = {
  readFile,
  writeFile,
  generateToken,
};