// Importing express and creating a router instance.
import express from "express";
const router = express.Router();

// Importing multer middleware for file uploads.
import upload from '../middlewares/multer.js';

// Importing message controller functions.
import {
  getMessageByRoomId,
  getMessageByRoomIdPagination,
  fileDownload,
  sendMessage,
} from "../controllers/messageController.js";

// Defining routes for message-related operations.
router.get('/:roomId', getMessageByRoomId);
router.get('/pag/:roomId', getMessageByRoomIdPagination);
router.get('/download/:filename', fileDownload);
router.post('/', upload.single("file"), sendMessage);

// Exporting the router.
export default router;
