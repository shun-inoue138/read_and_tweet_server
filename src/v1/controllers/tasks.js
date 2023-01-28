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
    const tasks = await Task.find({});
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
    console.log(`${req.params.id}のタスクを編集します`);
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
module.exports = { registerTask, getAllTasks, getTask, editTask };
