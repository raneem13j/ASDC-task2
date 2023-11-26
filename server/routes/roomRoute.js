// Importing express and creating a router instance.
import express from "express";
const router = express.Router();

// Importing room controller functions.
import {
  getAllRooms,
  getRoomById,
  getUsersInRoom,
  getRoomsByUserId,
  createRoom,
  joinRoom,
} from "../controllers/roomController.js";

// Defining routes for room-related operations.
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.get('/roomUsers/:id', getUsersInRoom);
router.get('/userRooms/:userId', getRoomsByUserId);
router.put('/:id', joinRoom);
router.post('/:id', createRoom);

// Exporting the router.
export default router;
