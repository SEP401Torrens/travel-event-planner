import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk to fetch client trips with pagination
export const fetchClientTrips = createAsyncThunk(
  "clientTrips/fetchClientTrips",
  async ({ clientId, currentPage, pageSize }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    const url = `${API_BASE_URL}/ClientTrip/list/${clientId}?CurrentPage=${currentPage}&PageSize=${pageSize}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch client trips");
    }

    const data = await response.json();
    return data;
  }
);

// Async thunk to delete a client trip
export const deleteClientTrip = createAsyncThunk(
  "clientTrips/deleteClientTrip",
  async (clientTripId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    const response = await fetch(`${API_BASE_URL}/ClientTrip/${clientTripId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete client trip");
    }

    return clientTripId;
  }
);

// Async thunk to add a client trip
export const addClientTrip = createAsyncThunk(
  "clientTrips/addClientTrip",
  async (newTrip, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const response = await fetch(`${API_BASE_URL}/ClientTrip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTrip),
    });

    if (!response.ok) {
      throw new Error("Failed to add client trip");
    }
    const data = await response.json();

    return { id: data.data, ...newTrip };
  }
);

const INITIAL_STATE = {
  trips: [],
  total: 0,
  totalPages: 0,
  pageSize: 8,
  currentPage: 1,
  status: "idle",
  error: null,
};

const clientTripSlice = createSlice({
  name: "clientTrips",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientTrips.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientTrips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trips = action.payload.data.list.map((trip) => ({
          id: trip.id,
          clientId: trip.cliendId,
          location: trip.locationDescription,
          travelStartDate: format(new Date(trip.startDate), "dd/MM/yyyy"),
          travelEndDate: format(new Date(trip.endDate), "dd/MM/yyyy"),
          budget: trip.budget,
        }));
        state.total = action.payload.data.totalItems;
        state.totalPages = action.payload.data.totalPages;
        state.pageSize = action.payload.data.size;
        state.currentPage = action.payload.data.currentPage;
      })
      .addCase(fetchClientTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteClientTrip.fulfilled, (state, action) => {
        const clientTripId = action.payload;
        state.trips = state.trips.filter((trip) => trip.id !== clientTripId);
        state.total -= 1;
        state.totalPages = Math.ceil(state.total / state.pageSize);

        // If the current page is now empty, move to the previous page
        if (state.trips.length === 0 && state.currentPage > 1) {
          state.currentPage -= 1;
        }
      })
      .addCase(addClientTrip.fulfilled, (state, action) => {
        state.trips.push({
          id: action.payload.id,
          clientId: action.payload.clientId,
          location: action.payload.location,
          travelStartDate: format(
            new Date(action.payload.startDate),
            "dd/MM/yyyy"
          ),
          travelEndDate: format(new Date(action.payload.endDate), "dd/MM/yyyy"),
          budget: action.payload.budget,
        });
        state.total += 1;

        const totalPages = Math.ceil(state.total / state.pageSize);
        const newCurrentPage =
          state.total % state.pageSize === 1
            ? state.currentPage + 1
            : state.currentPage;

        state.totalPages = totalPages;
        state.currentPage = newCurrentPage;
      })
      .addCase(addClientTrip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = clientTripSlice.actions;
export const clientTripsReducer = clientTripSlice.reducer;
