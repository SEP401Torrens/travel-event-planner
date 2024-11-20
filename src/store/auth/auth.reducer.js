import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isAuthenticated: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    signIn: (state, action) => {
      localStorage.setItem("authToken", action.payload);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
