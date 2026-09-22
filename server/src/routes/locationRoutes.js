import express from "express";

import {
  addLocation,
  getLocations,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// User - Get Locations
router.get("/", getLocations);

// Admin - Add Location
router.post("/", adminMiddleware, addLocation);

// Admin - Update Location
router.put("/:id", adminMiddleware, updateLocation);

// Admin - Delete Location
router.delete("/:id", adminMiddleware, deleteLocation);

export default router;