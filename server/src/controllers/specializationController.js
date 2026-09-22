import Specialization from "../models/Specialization.js";

// Add Specialization
export const addSpecialization = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Specialization name is required",
      });
    }

    const specialization = await Specialization.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Specialization added successfully",
      specialization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Specializations
export const getSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find().sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      specializations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Specialization
export const updateSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!specialization) {
      return res.status(404).json({
        success: false,
        message: "Specialization not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Specialization updated successfully",
      specialization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Specialization
export const deleteSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndDelete(
      req.params.id
    );

    if (!specialization) {
      return res.status(404).json({
        success: false,
        message: "Specialization not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Specialization deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};