const router = require("express").Router();
const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();

router.get("/", (req, res) => {
  res.json("tasks router!");
});

module.exports = router;
