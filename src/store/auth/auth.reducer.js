import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = createAsyncThunk("auth/login", async (credentials) => {
  console.log("credentials", credentials);
  const response = await fetch(`${API_BASE_URL}/Authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to log in");
  }

  const data = await response.json();
  return data;
});

//  sign-up
export const signUp = createAsyncThunk("auth/signUp", async (userDetails) => {
  const response = await fetch(`${API_BASE_URL}/Authentication/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  const data = await response.json();
  return data;
});

const INITIAL_STATE = {
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("authToken", action.payload.token);
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { signIn, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
