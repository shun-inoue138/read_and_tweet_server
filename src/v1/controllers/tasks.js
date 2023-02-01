const Task = require("../models/Task.js");

//タスク登録
const registerTask = async (req, res) => {
  const user = new Task(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

//タスク一覧取得
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().where("user_id").equals(req.query.user_id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

//タスク取得
const getTask = async (req, res) => {
  try {
    console.log(req.body);
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json("タスクが見つかりません");
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

//タスク編集
const editTask = async (req, res) => {
  try {
    //todo:重複箇所をまとめる
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("タスクが見つかりません");
    }
    await task.updateOne({ $set: req.body });
    console.log("編集完了");
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

//タスク完了
const completeTask = async (req, res) => {
  console.log(req.body);
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("タスクが見つかりません");
    }
    if (task.isCompleted) {
      return res.status(500).json("完了済みです");
    }

    await task.updateOne({ $set: req.body });

    return res.status(200).json(task);
  } catch {
    res.status(500).json(error);
  }
};

//タスクを未完了に戻す
const undoCompletedTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("タスクが見つかりません");
    }
    if (!task.isCompleted) {
      return res.status(500).json("タスクは未完了です");
    }

    await task.updateOne({ $set: req.body });

    return res.status(200).json(task);
  } catch {
    res.status(500).json(error);
  }
};

//タスク削除
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("タスクが見つかりません");
    }
    await task.deleteOne();
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  registerTask,
  getAllTasks,
  getTask,
  editTask,
  deleteTask,
  completeTask,
  undoCompletedTask,
};
