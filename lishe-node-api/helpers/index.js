const bcrypt = require("bcryptjs");
const { get } = require("lodash");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const tryCatch = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getReqBody = req => get(req, 'body', '');

module.exports = {
    tryCatch,
    encryptPassword,
    getReqBody
}