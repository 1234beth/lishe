
const Joi = require("joi");

function signInValidation(credentials) {
  const schema = Joi.object({
    emailaddress: Joi.string().email().required(),
    userpassword: Joi.string().min(7).required(),
  });

  return schema.validate(credentials);
}

module.exports = {
  signInValidation
}