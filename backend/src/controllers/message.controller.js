const messageModel = require("../models/message.model");
const userModel = require("../models/user.model");

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find()
      .populate("sender", "name email");
    res.status(200).json({ messages});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessageStats = async (req, res) => {
  try {
    const [totalMessages, totalUsers] = await Promise.all([
      messageModel.countDocuments(),
      userModel.countDocuments(),
    ]);

    res.json({
      totalMessages,
      totalUsers,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMessages,
  getMessageStats,
};
