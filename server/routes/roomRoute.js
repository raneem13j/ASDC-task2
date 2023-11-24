import express from "express";
const router = express.Router();


import {
  getAllRooms,
  getRoomById,
  getUsersInRoom,
  getRoomsByUserId,
  createRoom,
  joinRoom

 
  } from "../controllers/roomController.js";

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.get('/roomUsers/:id', getUsersInRoom);
router.get('/userRooms/:userId', getRoomsByUserId);
router.put('/:id', joinRoom);
router.post('/:id', createRoom);



export default router;