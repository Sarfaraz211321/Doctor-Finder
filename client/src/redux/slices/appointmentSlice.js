import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  selectedAppointment: null,
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",

  initialState,

  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },

    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },

    setAppointmentLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAppointmentError: (state, action) => {
      state.error = action.payload;
    },

    clearAppointments: (state) => {
      state.appointments = [];
      state.selectedAppointment = null;
    },
  },
});

export const {
  setAppointments,
  setSelectedAppointment,
  setAppointmentLoading,
  setAppointmentError,
  clearAppointments,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;