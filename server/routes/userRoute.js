// Importing express and creating a router instance.
import express from "express";
const router = express.Router();

// Importing user controller functions.
import {
  getAllUsers,
  getUserById,
  logout,
  register,
  login,
  deleteUser,
} from "../controllers/userController.js";

// Defining routes for user-related operations.
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/logout', logout);
router.post('/login', login);
router.post('/register', register);
router.delete('/:id', deleteUser);

// Exporting the router.
export default router;
