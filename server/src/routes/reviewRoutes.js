import express from "express";

import {
  addReview,
  getDoctorReviews,
} from "../controllers/reviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User - Add Review
router.post("/", authMiddleware, addReview);

// Get Doctor Reviews
router.get("/doctor/:doctorId", getDoctorReviews);

export default router;