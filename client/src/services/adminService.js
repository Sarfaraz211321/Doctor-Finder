
import api from "./api.js";

// Admin Profile
export const getAdminProfile = async () => {
  const response = await api.get("/auth/admin/profile");

  return response.data;
};

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");

  return response.data;
};

// Patients
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(
    `/admin/users/${id}`
  );

  return response.data;
};

// Appointments
export const getAllAppointments = async () => {
  const response = await api.get(
    "/appointments/all"
  );

  return response.data;
};
