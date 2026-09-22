import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",

  initialState,

  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },

    setLocationLoading: (state, action) => {
      state.loading = action.payload;
    },

    setLocationError: (state, action) => {
      state.error = action.payload;
    },

    clearLocations: (state) => {
      state.locations = [];
    },
  },
});

export const {
  setLocations,
  setLocationLoading,
  setLocationError,
  clearLocations,
} = locationSlice.actions;

export default locationSlice.reducer;