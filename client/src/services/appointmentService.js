import api from "./api.js";

// Book appointment
export const createAppointment = async (appointmentData) => {
  const response = await api.post("/appointments", appointmentData);
  return response.data;
};

// User - My appointments
export const getMyAppointments = async () => {
  const response = await api.get("/appointments/my");
  return response.data;
};

// Admin - All appointments
export const getAllAppointments = async () => {
  const response = await api.get("/appointments/all");
  return response.data;
};