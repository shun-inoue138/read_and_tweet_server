const Category = require("../models/Category");

//カテゴリー登録
const registerCategory = async (req, res) => {
  //todo:同一user間では重複を許さない
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

//カテゴリー一覧取得
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerCategory, getAllCategories };
