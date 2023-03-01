const message = require("../Models/message.model");

exports.create = async (req, res) => {
  const data = req.body;

  const newMessage = new message({
    chatId: data.chatId,
    senderId: data.senderId,
    text: data.text,
  });

  try {
    await newMessage.save();
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.findAll = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await message.find({
      chatId: chatId,
    });

    return res.status(201).json(messages);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.findLastMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await message
      .find({
        chatId: chatId,
      })
      .sort({ $natural: -1 })
      .limit(1)
      .exec();

    return res.status(201).json(messages);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};
