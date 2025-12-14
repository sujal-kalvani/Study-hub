import { configureStore } from "@reduxjs/toolkit";
import toggleSliceReducer from "./toggleSlice"; 
import authReducer from "./AuthSlice"

export const store = configureStore({
  reducer: {
    toggle: toggleSliceReducer,
    auth:authReducer
  },
});
