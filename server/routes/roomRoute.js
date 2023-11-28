// Importing express and creating a router instance.
import express from "express";
const router = express.Router();
import {userAuth} from "../middlewares/auth.js"

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
router.put('/:id',userAuth, joinRoom);
router.post('/:id',userAuth, createRoom);

// Exporting the router.
export default router;
