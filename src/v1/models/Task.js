const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  randomNote: {
    type: String,
  },
  categories: {
    type: Array,
  },
  postContent: {
    type: String,
    maxLengh: 140,
  },
  understandingRate: {
    type: Number,
    min: 1,
    max: 5,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

TaskSchema.set("timestamps", true);

module.exports = mongoose.model("Task", TaskSchema);
