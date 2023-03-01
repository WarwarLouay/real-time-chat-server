const notification = require("../Models/notification.model");

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const newData = new notification();

    newData.senderId = data.senderId;
    newData.isRead = data.isRead;

    await newData.save();
    return res.status(201).json(newData);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.delete = async (req, res) => {
    try {
      const data = req.body;
      await notification.deleteMany({senderId: data.senderId}).exec();
      const not = await notification.find();
      return res.status(201).json(not);
    } catch (error) {
      return res.status(400).json({ message: "something wrong" });
    }
  };

  exports.findAll = async (req, res) => {
    try {
      const not = await notification.find();
      return res.status(201).json(not);
    } catch (error) {
      return res.status(400).json({ message: "something wrong" });
    }
  };
