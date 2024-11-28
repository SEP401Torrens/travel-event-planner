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
    return { clientId, data };
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
    trips: {},
    total: {},
    totalPages: {},
    pageSize: 8, // Default page size
    currentPage: {},
    status: 'idle',
    error: null,
  };

const clientTripSlice = createSlice({
  name: "clientTrips",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      const { clientId, page } = action.payload;
      state.currentPage[clientId] = page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientTrips.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientTrips.fulfilled, (state, action) => {
       const { clientId, data } = action.payload;
        state.status = 'succeeded';
        state.trips[clientId] = data.data.list.map((trip) => ({
          id: trip.id,
          location: trip.locationDescription,
          travelStartDate: format(new Date(trip.startDate), "dd/MM/yyyy"),
          travelEndDate: format(new Date(trip.endDate), "dd/MM/yyyy"),
          budget: trip.budget,
        }));
        state.total[clientId] = data.data.totalItems;
        state.totalPages[clientId] = data.data.totalPages;
        state.pageSize = data.data.size;
        state.currentPage[clientId] = data.data.currentPage;
      })
      .addCase(fetchClientTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteClientTrip.fulfilled, (state, action) => {
         const clientTripId = action.payload;
        const clientId = Object.keys(state.trips).find(clientId =>
          state.trips[clientId].some(trip => trip.id === clientTripId)
        );
        state.trips[clientId] = state.trips[clientId].filter(trip => trip.id !== clientTripId);
        state.total[clientId] -= 1;
        state.totalPages[clientId] = Math.ceil(state.total[clientId] / state.pageSize);

        // If the current page is now empty, move to the previous page
        if (state.trips[clientId].length === 0 && state.currentPage[clientId] > 1) {
          state.currentPage[clientId] -= 1;
        }
      })
      .addCase(addClientTrip.fulfilled, (state, action) => {
        const { clientId, id, location, startDate, endDate, budget } = action.payload;
        if (!state.trips[clientId]) {
          state.trips[clientId] = [];
          state.total[clientId] = 0;
          state.totalPages[clientId] = 0;
          state.currentPage[clientId] = 1; // Initialize currentPage for new client
        }
        state.trips[clientId].push({
          id,
          location: location,
          travelStartDate: startDate,
          travelEndDate: endDate,
          budget,
        });
        state.total[clientId] += 1;

        const totalPages = Math.ceil(state.total[clientId] / state.pageSize);
        state.totalPages[clientId] = totalPages;

        // Only increment currentPage if the new trip causes a new page to be added
        if (
          state.total[clientId] % state.pageSize === 1 &&
          state.total[clientId] > state.pageSize
        ) {
          state.currentPage[clientId] += 1;
        }
      })
      .addCase(addClientTrip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = clientTripSlice.actions;
export const clientTripsReducer = clientTripSlice.reducer;
