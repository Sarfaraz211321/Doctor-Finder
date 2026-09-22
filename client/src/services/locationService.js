import api from "./api.js";

// Get all locations
export const getLocations = async () => {
  const response = await api.get("/locations");
  return response.data;
};

// Admin - Add location
export const addLocation = async (data) => {
  const response = await api.post("/locations", data);
  return response.data;
};

// Admin - Update location
export const updateLocation = async (id, data) => {
  const response = await api.put(`/locations/${id}`, data);
  return response.data;
};

// Admin - Delete location
export const deleteLocation = async (id) => {
  const response = await api.delete(`/locations/${id}`);
  return response.data;
};