import Message from "../models/messageModel.js";


export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessageByRoomId = async (req, res) => {
    try {
        const messages = await Message.find({
            roomId: req.params.roomId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
  };
