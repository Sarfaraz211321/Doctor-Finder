
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import Specialization from "../models/Specialization.js";
import Location from "../models/Location.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalDoctors,
      totalAppointments,
      totalSpecializations,
      totalLocations,
      recentAppointments,
      recentDoctors,
      popularSpecializations,
      popularLocations,
    ] = await Promise.all([
      User.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Specialization.countDocuments(),
      Location.countDocuments(),

      Appointment.find()
        .populate("user", "name email")
        .populate(
          "doctor",
          "name degree specialization clinicName city"
        )
        .sort({ createdAt: -1 })
        .limit(5),

      Doctor.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Appointment.aggregate([
        {
          $group: {
            _id: "$doctor",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "doctors",
            localField: "_id",
            foreignField: "_id",
            as: "doctor",
          },
        },
        { $unwind: "$doctor" },
        {
          $project: {
            _id: 0,
            name: "$doctor.specialization",
            count: 1,
          },
        },
      ]),

      Appointment.aggregate([
        {
          $group: {
            _id: "$doctor",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "doctors",
            localField: "_id",
            foreignField: "_id",
            as: "doctor",
          },
        },
        { $unwind: "$doctor" },
        {
          $project: {
            _id: 0,
            city: "$doctor.city",
            count: 1,
          },
        },
      ]),
    ]);

    res.json({
      success: true,

      stats: {
        totalUsers,
        totalDoctors,
        totalAppointments,
        totalSpecializations,
        totalLocations,
      },

      recentAppointments,
      recentDoctors,
      popularSpecializations,
      popularLocations,
    });
  } catch (error) {
    next(error);
  }
};

