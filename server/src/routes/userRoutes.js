import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getProfile,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

// User Profile
router.get("/profile", authMiddleware, getProfile);

// Admin - All Patients
router.get("/all", adminMiddleware, getAllUsers);

// Admin - Single Patient
router.get("/:id", adminMiddleware, getUserById);

export default router;