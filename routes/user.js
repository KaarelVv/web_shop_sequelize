import UserController from '../controllers/user.js';
import express from "express";


const router = express.Router();


// Add user to database
router.post('/add', UserController.addUser);

// Get all users
router.get('/all', UserController.getAllUsers);

export default router;