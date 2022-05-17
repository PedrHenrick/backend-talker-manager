const joi = require('joi');
const Joi = require('joi')
    .extend(require('@joi/date'));

const nameVerificationAndErrorMessages = {
  'any.required': 'O campo "name" é obrigatório',
  'string.min': 'O "name" deve ter pelo menos 3 caracteres',
};

const ageVerificationAndErrorMessages = {
  'any.required': 'O campo "age" é obrigatório',
  'number.min': 'A pessoa palestrante deve ser maior de idade',
};

const watchedAtVerificationAndErrorMessages = {
  'date.format': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};

const rateVerificationAndErrorMessages = {
  'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
  'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const talkVerificationAndErrorMessages = { 
  'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const validateTalkers = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).required().messages(nameVerificationAndErrorMessages),
    age: joi.number().min(18).required().messages(ageVerificationAndErrorMessages),
    talk: joi.object({
      watchedAt: Joi.date().format('DD/MM/YYYY').utc().required()
      .messages(watchedAtVerificationAndErrorMessages),
      rate: joi.number().min(1).max(5).required()
        .messages(rateVerificationAndErrorMessages),
    }).required().messages(talkVerificationAndErrorMessages),
  });

  const { error } = schema.validate(req.body);

  if (error !== undefined) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateTalkers,
};
