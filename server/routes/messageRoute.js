import express from "express";
const router = express.Router();
import upload from '../middlewares/multer.js';


import {
  getMessageByRoomId,
  sendMessage,
  } from "../controllers/messageController.js";


router.get('/:roomId', getMessageByRoomId);
router.post('/',upload.single("file"), sendMessage);



export default router;