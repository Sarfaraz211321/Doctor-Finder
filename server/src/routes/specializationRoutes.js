import express from "express";

import {
  addSpecialization,
  getSpecializations,
  updateSpecialization,
  deleteSpecialization,
} from "../controllers/specializationController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// User - Get Specializations
router.get("/", getSpecializations);

// Admin - Add Specialization
router.post("/", adminMiddleware, addSpecialization);

// Admin - Update Specialization
router.put("/:id", adminMiddleware, updateSpecialization);

// Admin - Delete Specialization
router.delete("/:id", adminMiddleware, deleteSpecialization);

export default router;