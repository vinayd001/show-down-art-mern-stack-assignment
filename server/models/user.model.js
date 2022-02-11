const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      min: 4,
      unique: true,
    },
    fullname: { type: String, required: [true, "Fullname is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
