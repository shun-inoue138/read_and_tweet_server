const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/User.js");

const hashPassword = (password) => {
  console.log("hashPassword is called");
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const duplicateChecker = async (value, type) => {
  console.log(value);
  const user = await User.findOne({ [type]: value });
  if (user) {
    throw new Error(`${type}は既に登録されています`);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  duplicateChecker,
};
