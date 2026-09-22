import Review from "../models/Review.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const { doctor, rating, comment } = req.body;

    if (!doctor || !rating) {
      return res.status(400).json({
        success: false,
        message: "Doctor and rating are required",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      doctor,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Doctor Reviews
export const getDoctorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      doctor: req.params.doctorId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};