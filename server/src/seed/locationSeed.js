import mongoose from "mongoose";
import dotenv from "dotenv";
import Location from "../models/Location.js";

dotenv.config();

const locations = [
    { name: "Hazratganj", city: "Lucknow", state: "Uttar Pradesh" },
    { name: "Gomti Nagar", city: "Lucknow", state: "Uttar Pradesh" },
    { name: "Aliganj", city: "Lucknow", state: "Uttar Pradesh" },
    { name: "Indira Nagar", city: "Lucknow", state: "Uttar Pradesh" },
    { name: "Noida Sector 18", city: "Noida", state: "Uttar Pradesh" },
    { name: "Noida Sector 62", city: "Noida", state: "Uttar Pradesh" },
    { name: "Vaishali", city: "Ghaziabad", state: "Uttar Pradesh" },
    { name: "Raj Nagar", city: "Ghaziabad", state: "Uttar Pradesh" },
    { name: "Civil Lines Prayagraj", city: "Prayagraj", state: "Uttar Pradesh" },
    { name: "Civil Lines Kanpur", city: "Kanpur", state: "Uttar Pradesh" },
    { name: "Gomti Nagar Extension", city: "Lucknow", state: "Uttar Pradesh" },
    { name: "Lalbagh", city: "Lucknow", state: "Uttar Pradesh" }
];

const seedLocations = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        for (const location of locations) {
            await Location.updateOne(
                {
                    name: location.name,
                    city: location.city
                },
                {
                    $setOnInsert: location
                },
                {
                    upsert: true
                }
            );
        }

        console.log("Locations seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Location Seed Error:", error.message);
        process.exit(1);
    }
};

seedLocations();