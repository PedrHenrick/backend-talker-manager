const joi = require('joi');

const validateLogin = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      'any.required': 'O campo "email" é obrigatório',
      'string.email': 'O "email" deve ter o formato "email@email.com"',
    }),
    password: joi.string().min(6).required().messages({
      'any.required': 'O campo "password" é obrigatório',
      'string.min': 'O "password" deve ter pelo menos 6 caracteres',
    }),
  });

  const { error } = schema.validate(req.body);

  if (error !== undefined) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateLogin,
};
