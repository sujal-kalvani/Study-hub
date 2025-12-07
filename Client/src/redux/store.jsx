import { configureStore } from "@reduxjs/toolkit";
import toggleSliceReducer from "./toggleSlice"; 

export const store = configureStore({
  reducer: {
    toggle: toggleSliceReducer,
  },
});
