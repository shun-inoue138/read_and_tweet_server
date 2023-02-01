const Category = require("../models/Category");

//カテゴリー登録
const registerCategory = async (req, res) => {
  //todo:同一user間では重複を許さない
  try {
    const sameUserCategories = await Category.find()
      .where("user_id")
      .equals(req.body.user_id);
    console.log({ sameUserCategories });
    const sameUserCategoryNames = sameUserCategories.map(
      (category) => category.name
    );
    if (sameUserCategoryNames.includes(req.body.name)) {
      return res.status(400).json("そのカテゴリーは既に登録されています");
    }
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

//カテゴリー一覧取得
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .where("user_id")
      .equals(req.query.user_id);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerCategory, getAllCategories };
