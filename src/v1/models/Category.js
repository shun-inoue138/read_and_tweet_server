const mongoose = require("mongoose");

//todo:多階層対応
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 20,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
CategorySchema.set("timestamps", true);

module.exports = mongoose.model("Category", CategorySchema);
