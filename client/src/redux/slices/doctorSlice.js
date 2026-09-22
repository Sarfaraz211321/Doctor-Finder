import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",

  initialState,

  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },

    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },

    setDoctorLoading: (state, action) => {
      state.loading = action.payload;
    },

    setDoctorError: (state, action) => {
      state.error = action.payload;
    },

    clearDoctors: (state) => {
      state.doctors = [];
      state.selectedDoctor = null;
    },
  },
});

export const {
  setDoctors,
  setSelectedDoctor,
  setDoctorLoading,
  setDoctorError,
  clearDoctors,
} = doctorSlice.actions;

export default doctorSlice.reducer;