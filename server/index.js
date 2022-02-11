const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.model");

app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.post("/api/addUsers", (req, res) => {
  const users = User.insertMany(req.body);
  users
    .then(() => {
      res
        .status(200)
        .json({ status: "success", message: "User(s) added successfully" });
    })
    .catch((err) => {
      res.json({ status: "fail", message: err });
    });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: err });
  }
});

app.listen(8800, () => {
  console.log("Server started on 8800");
});
