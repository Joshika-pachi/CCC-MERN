const Contact =
require("../models/Contact");

// SAVE CONTACT MESSAGE

const saveMessage =
async (req, res) => {

  try {

    const message =
      await Contact.create({

        name: req.body.name,

        email: req.body.email,

        message: req.body.message

      });

    res.status(201).json(message);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// GET ALL MESSAGES
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE A MESSAGE
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  saveMessage,
  getMessages,
  deleteMessage
};
