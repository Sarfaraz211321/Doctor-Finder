import express from "express";

import {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
} from "../controllers/doctorController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// User - Search Doctors
router.get("/search", searchDoctors);

// User - Get All Doctors
router.get("/", getDoctors);

// User - Get Single Doctor
router.get("/:id", getDoctorById);

// Admin - Add doctor with image
router.post(
  "/",
  adminMiddleware,
  upload.single("image"),
  addDoctor
);

// Admin - Update doctor with optional new image
router.put(
  "/:id",
  adminMiddleware,
  upload.single("image"),
  updateDoctor
);

// Admin - Delete doctor
router.delete(
  "/:id",
  adminMiddleware,
  deleteDoctor
);

export default router;