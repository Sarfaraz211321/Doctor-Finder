import api from "./api.js";

// ================= USER =================

// User Register
export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/user/register",
    data
  );

  if (response.data.token) {
    localStorage.setItem(
      "userToken",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};

// User Login
export const loginUser = async (data) => {
  const response = await api.post(
    "/auth/user/login",
    data
  );

  if (response.data.token) {
    localStorage.setItem(
      "userToken",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};


// ================= ADMIN =================

// Admin Login
export const loginAdmin = async (data) => {
  const response = await api.post(
    "/auth/admin/login",
    data
  );

  if (response.data.token) {
    localStorage.setItem(
      "adminToken",
      response.data.token
    );

    localStorage.setItem(
      "admin",
      JSON.stringify(response.data.admin)
    );
  }

  return response.data;
};


// ================= LOGOUT =================

export const logoutUser = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("user");
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
};