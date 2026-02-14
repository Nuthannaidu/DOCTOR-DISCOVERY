import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./doctorSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorReducer,
  },
});
