import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY ? "Loaded" : "NOT LOADED");
console.log(
  "Cloudinary API Secret:",
  process.env.CLOUDINARY_API_SECRET ? "Loaded" : "NOT LOADED"
);

export default cloudinary;