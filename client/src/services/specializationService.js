import api from "./api.js";

// Get all specializations
export const getSpecializations = async () => {
  const response = await api.get("/specializations");
  return response.data;
};

// Admin - Add specialization
export const addSpecialization = async (data) => {
  const response = await api.post("/specializations", data);
  return response.data;
};

// Admin - Update specialization
export const updateSpecialization = async (id, data) => {
  const response = await api.put(`/specializations/${id}`, data);
  return response.data;
};

// Admin - Delete specialization
export const deleteSpecialization = async (id) => {
  const response = await api.delete(`/specializations/${id}`);
  return response.data;
};