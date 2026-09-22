import express from "express";
import cors from "cors";

import userAuthRoutes from "./routes/userAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import specializationRoutes from "./routes/specializationRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// User Auth Routes
app.use("/api/auth/user", userAuthRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Admin Auth Routes
app.use("/api/auth/admin", adminAuthRoutes);

// Doctor Routes
app.use("/api/doctors", doctorRoutes);

// Appointment Routes
app.use("/api/appointments", appointmentRoutes);

// Specialization Routes
app.use("/api/specializations", specializationRoutes);

// Location Routes
app.use("/api/locations", locationRoutes);

// Review Routes
app.use("/api/reviews", reviewRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Doctor Finder API is running",
  });
});

// Error Middleware
app.use(errorMiddleware);

export default app;