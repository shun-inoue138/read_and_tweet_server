const router = require("express").Router();
const express = require("express");
const { body } = require("express-validator");
const {
  registerCategory,
  getAllCategories,
} = require("../controllers/categories");
const { categoriesValidator } = require("../handlers/validation");
const app = express();

app.use(express.json());
require("dotenv").config();

//カテゴリー登録
router.post(
  "/",
  body("name")
    .isLength({ min: 1 })
    .withMessage("カテゴリー名を入力してください")
    .isLength({ max: 20 })
    .withMessage("20文字以内で入力してください"),
  categoriesValidator,
  registerCategory
);

// カテゴリー一覧取得;
router.get("/", getAllCategories);

module.exports = router;
