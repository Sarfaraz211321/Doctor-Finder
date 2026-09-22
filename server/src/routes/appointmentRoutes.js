import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// User - Book appointment
router.post("/", authMiddleware, createAppointment);

// User - My appointments
router.get("/my", authMiddleware, getMyAppointments);

// Admin - All appointments
router.get("/all", adminMiddleware, getAllAppointments);

export default router;