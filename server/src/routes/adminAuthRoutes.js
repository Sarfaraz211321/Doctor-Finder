import express from "express";

import {
  loginAdmin,
  getAdminProfile,
} from "../controllers/adminAuthController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Login
router.post("/login", loginAdmin);

// Admin Profile
router.get("/profile", adminMiddleware, getAdminProfile);

export default router;