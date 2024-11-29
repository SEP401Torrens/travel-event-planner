import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "../../utils/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = createAsyncThunk("auth/login", async (credentials) => {
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
  const response = await fetch(`${API_BASE_URL}/Authentication/signup`, {
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

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      throw new Error("No token found");
    }
    const decodedToken = decodeToken(token);
    console.log("decodedToken", decodedToken);
    if (!decodedToken && !decodedToken.userId) {
      throw new Error("No token found");
    }

    const response = await fetch(
      `https://tep-backend-649330051049.us-central1.run.app/User/${decodedToken.nameid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();
    console.log("userData", userData);
    return { email: decodedToken.email, ...userData.data} ;
  }
);

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
        // state.user = action.payload.user;
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
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
