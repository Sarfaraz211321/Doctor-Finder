import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res, next) => {
  try {
    const {
      doctor,
      patientName,
      patientPhone,
      appointmentDate,
      preferredTime,
      reason,
    } = req.body;

    if (
      !doctor ||
      !patientName ||
      !patientPhone ||
      !appointmentDate ||
      !preferredTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      doctor,
      patientName,
      patientPhone,
      appointmentDate,
      preferredTime,
      reason: reason || "",
    });

    const populatedAppointment = await Appointment.findById(
      appointment._id
    )
      .populate("user", "name email")
      .populate(
        "doctor",
        "name degree specialization clinicName clinicAddress city phone consultationFee image"
      );

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: populatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

// Logged-in user's appointments
export const getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      user: req.user.id,
    })
      .populate(
        "doctor",
        "name degree specialization clinicName clinicAddress city phone consultationFee image"
      )
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Admin - all appointments
export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "name email")
      .populate(
        "doctor",
        "name degree specialization clinicName clinicAddress city phone consultationFee image"
      )
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};