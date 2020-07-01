// Using Joi for Validation
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const Schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Schema.validate(data);
};
// Login Validation
const loginValidation = (data) => {
  const Schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
