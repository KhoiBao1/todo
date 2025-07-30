const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  due_date: { type: Date },
  tags: [String]
});

module.exports = mongoose.model("Task", TaskSchema);
