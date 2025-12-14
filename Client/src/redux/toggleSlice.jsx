import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    signup: true,
  },
  
  reducers: {
    toggleState: (state) => {
      state.signup = !state.signup;
    },
  },

});

export const { toggleState } = toggleSlice.actions;
export default toggleSlice.reducer;
