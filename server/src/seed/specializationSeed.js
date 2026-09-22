import mongoose from "mongoose";
import dotenv from "dotenv";
import Specialization from "../models/Specialization.js";

dotenv.config();

const specializations = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Dentist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  "ENT Specialist",
  "Ophthalmologist",
  "Psychiatrist",
  "Urologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Nephrologist",
  "Endocrinologist",
  "Oncologist",
  "Surgeon"
];

const seedSpecializations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const name of specializations) {
      await Specialization.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true }
      );
    }

    console.log("Specializations seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Specialization Seed Error:", error.message);
    process.exit(1);
  }
};

seedSpecializations();