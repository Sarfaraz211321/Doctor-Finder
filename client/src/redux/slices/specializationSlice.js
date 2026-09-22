import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specializations: [],
  loading: false,
  error: null,
};

const specializationSlice = createSlice({
  name: "specialization",

  initialState,

  reducers: {
    setSpecializations: (state, action) => {
      state.specializations = action.payload;
    },

    setSpecializationLoading: (state, action) => {
      state.loading = action.payload;
    },

    setSpecializationError: (state, action) => {
      state.error = action.payload;
    },

    clearSpecializations: (state) => {
      state.specializations = [];
    },
  },
});

export const {
  setSpecializations,
  setSpecializationLoading,
  setSpecializationError,
  clearSpecializations,
} = specializationSlice.actions;

export default specializationSlice.reducer;