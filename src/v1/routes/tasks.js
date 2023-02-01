const router = require("express").Router();
const express = require("express");
const { body } = require("express-validator");
const {
  registerTask,
  getAllTasks,
  getTask,
  editTask,
  deleteTask,
  completeTask,
  undoCompletedTask,
} = require("../controllers/tasks");
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
  body("categories").isArray().withMessage("カテゴリーを入力してください"),
  body("randomNote")
    .isLength({ max: 140 })
    .withMessage("140文字以内で入力してください"),
  body("user_id"),
  tasksValidator,
  registerTask
);

//タスク一覧取得
router.get("/", getAllTasks);

//タスク取得
router.get("/:id", getTask);

//タスク編集
router.put(
  "/:id",
  body("url").isURL().withMessage("URLを入力してください"),
  body("title").isLength({ min: 1 }).withMessage("タイトルを入力してください"),
  body("dueDate").isDate().withMessage("日付を入力してください"),
  body("postContent")
    .isLength({ max: 140 })
    .withMessage("140文字以内で入力してください"),
  body("categories").isArray().withMessage("カテゴリーを入力してください"),
  body("randomNote")
    .isLength({ max: 140 })
    .withMessage("140文字以内で入力してください"),
  tasksValidator,
  editTask
);

//タスク完了
router.put("/:id/complete", completeTask);

//タスクを未完了に戻す
router.put("/:id/undo", undoCompletedTask);

//タスク削除
router.delete("/:id", deleteTask);

module.exports = router;
