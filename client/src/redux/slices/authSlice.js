import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  user: user || null,
  admin: admin || null,
  userToken: localStorage.getItem("userToken") || null,
  adminToken: localStorage.getItem("adminToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.userToken = action.payload.token;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );

      localStorage.setItem("userToken", action.payload.token);
    },

    setAdmin: (state, action) => {
      state.admin = action.payload.admin;
      state.adminToken = action.payload.token;

      localStorage.setItem(
        "admin",
        JSON.stringify(action.payload.admin)
      );

      localStorage.setItem("adminToken", action.payload.token);
    },

    logoutUser: (state) => {
      state.user = null;
      state.userToken = null;

      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
    },

    logoutAdmin: (state) => {
      state.admin = null;
      state.adminToken = null;

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    },
  },
});

export const {
  setUser,
  setAdmin,
  logoutUser,
  logoutAdmin,
} = authSlice.actions;

export default authSlice.reducer;