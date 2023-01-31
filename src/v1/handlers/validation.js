const { validationResult } = require("express-validator");

const commonProcess = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//todo:共通部分しかないなら関数名も分けなくていいかも
const tasksValidator = (req, res, next) => {
  commonProcess(req, res, next);
};

const categoriesValidator = (req, res, next) => {
  commonProcess(req, res, next);
};

const authValidator = (req, res, next) => {
  commonProcess(req, res, next);
};
module.exports = { tasksValidator, categoriesValidator, authValidator };
