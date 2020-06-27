// Using Joi for Validation
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const Schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, Schema);
};
// Login Validation
const loginValidation = (data) => {
  const Schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, Schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
