import Message from "../models/messageModel.js";
import upload from "../middlewares/multer.js";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sendMessage = async (req, res) => {
  try {
    let fileDetails = {}; 

    if (req.file) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

   // Use the original filename as the custom name
   const originalName = req.file.originalname;
      
      const uploadedfile = await cloudinary.uploader.upload(req.file.path, {
        public_id: originalName,
      });

      fileDetails = {
        public_id: uploadedfile.public_id,
        url: uploadedfile.secure_url,
        name: originalName,
      };
    }

    const newMessage = new Message({
      roomId: req.body.roomId,
      senderId: req.body.senderId,
      text: req.body.text,
      file: fileDetails,
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

export const getMessageByRoomIdPagination = async (req, res) => {
  const roomID = req.params.roomId;
  const page = req.query.page * 1 || 1;
  const pageSize = req.query.pageSize * 1 || 10; // Adjust the default page size as needed

  try {
    // Count the total number of messages for the given chat room
    const count = await Message.countDocuments({ roomId: roomID });

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / pageSize);

    // Calculate the number of messages to skip based on the current page
    const skip = (page - 1) * pageSize;

    // Fetch messages with pagination
    const messages = await Message.find({ roomId: roomID })
      .sort({ timestamp: -1 }) // Sort messages by timestamp in descending order
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      results: messages.length,
      page,
      totalPages,
      data: messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fileDownload = async (req, res) => {

  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", filename); 

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Provide the file for download
      res.sendFile(filePath);
    } else {
      // If the file does not exist, return a 404 Not Found status
      res.status(404).send("File not found");
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
