import Message from "../models/messageModel.js";
import upload from "../middlewares/multer.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

export const sendMessage = async (req, res) => {
  try {
    let fileDetails = {}; // Add this line to store file details

    if (req.file) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const uploadedfile = await cloudinary.uploader.upload(req.file.path);
      fileDetails = {
        public_id: uploadedfile.public_id,
        url: uploadedfile.secure_url,
      };
    }

    const newMessage = new Message({
      roomId: req.body.roomId,
      senderId: req.body.senderId,
      text: req.body.text,
      file: fileDetails, // Assign file details here
    });

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
