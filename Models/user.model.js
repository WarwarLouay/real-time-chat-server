const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    fullName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatAppUser", user);
