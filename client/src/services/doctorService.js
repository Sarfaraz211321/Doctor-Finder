
import api from "./api.js";

// Get all doctors
export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

// Search doctors
export const searchDoctors = async (specialization, city) => {
  const response = await api.get("/doctors/search", {
    params: { specialization, city },
  });

  return response.data;
};

// Get doctor by ID
export const getDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);
  return response.data;
};

// Admin - Add doctor
export const addDoctor = async (doctorData) => {
  const response = await api.post("/doctors", doctorData);

  return response.data;
};

// Admin - Update doctor
export const updateDoctor = async (id, doctorData) => {
  const response = await api.put(
    `/doctors/${id}`,
    doctorData
  );

  return response.data;
};

// Admin - Delete doctor
export const deleteDoctor = async (id) => {
  const response = await api.delete(`/doctors/${id}`);

  return response.data;
};

