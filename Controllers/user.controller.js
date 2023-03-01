const user = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const newData = new user();

    newData.email = data.email;
    newData.fullName = data.email;

    let count = await user.findOne({ email: newData.email }).exec();
    if (count) {
      const token = createToken(count._id);
      return res.status(200).json(count);
    } else {
      const u = await newData.save();
      const token = createToken(u._id);
      return res.status(201).json(newData);
    }
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await user.find().exec();
    return res.status(201).json(users);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};
