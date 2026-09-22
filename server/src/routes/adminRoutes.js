import express from "express";
import {
  getDashboardStats,
} from "../controllers/dashboardController.js";
import {
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin dashboard
router.get("/dashboard", adminMiddleware, getDashboardStats);

// Patients
router.get("/users", adminMiddleware, getAllUsers);
router.get("/users/:id", adminMiddleware, getUserById);

export default router;