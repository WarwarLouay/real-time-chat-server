const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chat);
