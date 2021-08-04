const Joi = require('joi');

const JoiSignIn = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),  
});

const JoiSignUp = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),  
  role: Joi.string().required(),
});

module.exports = {
  JoiSignIn,
  JoiSignUp
};