// Using Joi for Validation
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};
// Login Validation
const loginValidation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
