const chat = require("../Models/chat.model");

exports.create = async (req, res) => {
  const data = req.body;

  try {
    const chats = await chat.findOne({
      members: { $all: [data.uid, data.uid2] },
    });

    if (chats) {
      return res.status(201).json(chats);
    }

    const newChat = new chat({
      members: [data.uid, data.uid2],
    });

    await newChat.save();
    return res.status(201).json(newChat);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.findAll = async (req, res) => {
  const uid = req.params.uid;
  try {
    const chats = await chat.find({
      members: { $in: [uid] },
    });
    return res.status(201).json(chats);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.findOne = async (req, res) => {
  const { uid, uid2 } = req.params;

  try {
    const response = await chat.findOne({
      members: { $all: [uid, uid2] },
    });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};
