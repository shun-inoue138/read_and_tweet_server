const User = require("../models/User.js");
const { hashPassword, comparePassword } = require("../utils/function.js");

//ユーザー登録
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("registerに入った");
    const user = new User({
      username,
      email,
      password: hashPassword(password),
    });
    console.log(user);
    await user.save();
    console.log("user.save()が終わった");
    return res.status(201).send({ user });
  } catch (error) {
    console.log("registerでエラー");

    return res.status(500).send(error);
  }
};

//ログイン
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "ユーザーが存在しません" });
    }
    if (!comparePassword(password, user.password)) {
      return res.status(401).send({ error: "パスワードが一致しません" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { signUp, signIn };
