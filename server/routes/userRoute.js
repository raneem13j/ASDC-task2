import express from "express";
const router = express.Router();


import {
  getAllUsers,
  getUserById,
  logout,
  register,
  login,
  deleteUser,
 
  } from "../controllers/userController.js";

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/logout',logout);
router.post('/login', login);
router.post('/register', register);
router.delete('/:id',deleteUser);



export default router;