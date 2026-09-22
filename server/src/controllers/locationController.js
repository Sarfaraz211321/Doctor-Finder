import Location from "../models/Location.js";

// Add Location
export const addLocation = async (req, res) => {
  try {
    const { name, city, state } = req.body;

    if (!name || !city) {
      return res.status(400).json({
        success: false,
        message: "Location name and city are required",
      });
    }

    const location = await Location.create({
      name,
      city,
      state,
    });

    res.status(201).json({
      success: true,
      message: "Location added successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Location
export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Location
export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};