const express = require("express");
const app = express();
const port = 3003;
const mongoose = require("mongoose");

app.use(express.json());
require("dotenv").config();

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL, () =>
    console.log("MongoDB Connected")
  );
} catch (error) {
  console.log(error);
}

//ルーティング
app.use("/api/v1/tasks", require("./src/v1/routes/tasks"));

//サーバー起動
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
