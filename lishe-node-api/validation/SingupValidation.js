const { object, string } = require("joi");

function SignupValidation(user) {
  const schema = object({
    fullname: string().required(),
    username: string().required(),
    emailaddress: string().email().required(),
    userpassword: string().min(8).required(),
  });

  return schema.validate(user);
}

module.exports = {
  SignupValidation
}