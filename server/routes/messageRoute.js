import express from "express";
const router = express.Router();


import {
  getMessageByRoomId,
  sendMessage,
  } from "../controllers/messageController.js";


router.get('/:roomId', getMessageByRoomId);
router.post('/', sendMessage);



export default router;