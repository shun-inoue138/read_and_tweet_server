const router = require("express").Router();
const express = require("express");
const { body } = require("express-validator");
const { registerTask, getAllTasks, getTask } = require("../controllers/tasks");
const { tasksValidator } = require("../handlers/validation");
const app = express();

app.use(express.json());
require("dotenv").config();

//タスク登録
router.post(
  "/",
  body("url").isURL().withMessage("URLを入力してください"),
  body("title").isLength({ min: 1 }).withMessage("タイトルを入力してください"),
  body("dueDate").isDate().withMessage("日付を入力してください"),
  body("postContent")
    .isLength({ max: 140 })
    .withMessage("140文字以内で入力してください"),
  tasksValidator,
  registerTask
);

//タスク一覧取得
router.get("/", getAllTasks);

//タスク取得
router.get("/:id", getTask);

module.exports = router;
