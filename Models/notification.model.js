const mongoose = require("mongoose");

const notification = new mongoose.Schema(
  {
    senderId: String,
  },
  {
    isRead: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notification);
