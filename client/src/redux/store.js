import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice.js";
import doctorReducer from "./slices/doctorSlice.js";
import appointmentReducer from "./slices/appointmentSlice.js";
import specializationReducer from "./slices/specializationSlice.js";
import locationReducer from "./slices/locationSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
    specialization: specializationReducer,
    location: locationReducer,
  },
});

export default store;