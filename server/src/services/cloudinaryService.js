import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "doctor-finder/doctors",
      resource_type: "image",
    });

    // Local uploaded file delete
    fs.unlinkSync(file.path);

    return result.secure_url;
  } catch (error) {
    // Error aaye to local file delete
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    throw error;
  }
};

export default {
  uploadImage,
};