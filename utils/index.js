const fs = require('fs/promises');

const readFile = async () => {
  const content = await fs.readFile('talker.json', 'utf-8');

  return JSON.parse(content);
};

const writeFile = async (content) => {
  await fs.writeFile('task.json', JSON.stringify(content), 'utf-8');
};

module.exports = {
  readFile,
  writeFile,
};