const router = require("express").Router();
const express = require("express");
const app = express();
const User = require("../models/User.js");

app.use(express.json());
require("dotenv").config();

const { body, check } = require("express-validator");
const { duplicateChecker } = require("../utils/function");
const { authValidator } = require("../handlers/validation.js");
const { signUp, signIn } = require("../controllers/auth.js");

//ユーザー登録
router.post(
  "/signup",
  body("username")
    .isString()
    .isLength({ min: 2 })
    .withMessage("ユーザー名を２文字以上で入力してください"),
  body("email")
    .isString()
    .isEmail()
    .withMessage("メールアドレスを入力してください"),
  body("password")
    .isString()
    .isLength({ min: 4 })
    .withMessage("パスワードを4文字以上で入力してください"),
  check("email").custom(async (value) => {
    await duplicateChecker(value, "email");
  }),
  check("username").custom(async (value) => {
    await duplicateChecker(value, "username");
  }),
  authValidator,
  signUp
);
//ログイン
router.post(
  "/signin",
  body("email")
    .isString()
    .isEmail()
    .withMessage("メールアドレスを入力してください"),
  body("password")
    .isString()
    .isLength({ min: 4 })
    .withMessage("パスワードを4文字以上で入力してください"),
  authValidator,
  signIn
);

module.exports = router;
