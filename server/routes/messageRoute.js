import express from "express";
const router = express.Router();
import upload from '../middlewares/multer.js';


import {
  getMessageByRoomId,
  getMessageByRoomIdPagination,
  fileDownload,
  sendMessage,
  } from "../controllers/messageController.js";


router.get('/:roomId', getMessageByRoomId);
router.get('/pag/:roomId', getMessageByRoomIdPagination);
router.get('/download/:filename',fileDownload);
router.post('/',upload.single("file"), sendMessage);



export default router;