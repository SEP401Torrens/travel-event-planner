import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format, parse } from "date-fns";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk to fetch events for a trip
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (
    {
      tripId,
      currentPage,
      pageSize,
      keyword,
      startDateTime,
      endDateTime,
      countryCode,
      interest,
    },
    thunkAPI
  ) => {
    const state = thunkAPI.getState();
    const token = state.auth.token; 

    // Parse and format the dates yyyy-MM-dd
    const formattedStartDateTime = format(
      parse(`${startDateTime}T14:00:00`, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
      "yyyy-MM-dd'T'HH:mm:ss'Z'"
    );
    const formattedEndDateTime = format(
      parse(`${endDateTime}T14:00:00`, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
      "yyyy-MM-dd'T'HH:mm:ss'Z'"
    );

    let url = `${API_BASE_URL}/Event/search/?pageSize=${pageSize}&currentPage=${currentPage}&startDateTime=${formattedStartDateTime}&endDateTime=${formattedEndDateTime}&countryCode=${countryCode}&classificationName=${interest}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    // Map the data to only include the required fields
    const mappedEvents = data.data.list.map((event) => ({
      id: event.id,
      name: event.name,
      startDate: event.dates.start.localDate,
    }));

    return {
      tripId,
      events: mappedEvents,
      totalPages: data.data.totalPages,
      totalItems: data.data.totalItems,
      currentPage: data.data.currentPage,
      pageSize: data.data.size,
    };
  }
);

// Async thunk to add events to a trip
export const addEventsToTrip = createAsyncThunk(
  'events/addEventsToTrip',
  async ({ clientTripId, eventIds }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token; 

    const response = await fetch(`${API_BASE_URL}/EventsTrip/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ clientTripId, eventIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to add events to trip');
    }

    const data = await response.json();
    return data;
  }
);

const INITIAL_STATE = {
  events: {},
  total: {},
  totalPages: {},
  pageSize: 10, // Default page size
  currentPage: {},
  status: "idle",
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      const { tripId, page } = action.payload;
      state.currentPage[tripId] = page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        const {
          tripId,
          events,
          totalPages,
          totalItems,
          currentPage,
          pageSize,
        } = action.payload;

        state.status = "succeeded";
        state.events[tripId] = events;
        state.total[tripId] = totalItems;
        state.totalPages[tripId] = totalPages;
        state.pageSize = pageSize;
        state.currentPage[tripId] = currentPage;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEventsToTrip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEventsToTrip.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addEventsToTrip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = eventsSlice.actions;

export const eventsReducer =  eventsSlice.reducer;
