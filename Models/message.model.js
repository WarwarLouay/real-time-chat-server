const mongoose = require("mongoose");

const message = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatAppUser",
    },
    text: {
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", message);
