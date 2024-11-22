import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const mockClients = [
  {
    id: 1,
    firstName: "Nicole",
    lastName: "Fisher",
    phone: "8090001111",
    nextTripDate: "17/10/2024",
    location: "Dominican Rep.",
  },
  {
    id: 2,
    firstName: "James",
    lastName: "Carter",
    phone: "8090001111",
    nextTripDate: "20/11/2024",
    location: "United States",
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Johnson",
    phone: "8090001111",
    nextTripDate: "05/12/2024",
    location: "Canada",
  },
];

// Async thunk to fetch clients from the backend
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockClients);
      }, 1000); // Simulate a network delay
    });

    //   const response = await fetch("/api/clients");
    //     const response = clients
    //     const data = await response.json();
    //     return data;
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const clientReducer = clientSlice.reducer;
