import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk to fetch clients with pagination and search
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async ({ currentPage, pageSize, searchTerm }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    let url = `${API_BASE_URL}/Client/list?currentPage=${currentPage}&pageSize=${pageSize}`;
    if (searchTerm) {
      url += `&searchTerm=${searchTerm}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the Bearer token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }

    const data = await response.json();
    return data;
  }
);

// Async thunk to add new a client
export const addClient = createAsyncThunk(
  "clients/addClient",
  async (newClient, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const newClientTransform = transformFormData(newClient);
    const response = await fetch(`${API_BASE_URL}/Client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newClientTransform),
    });

    if (!response.ok) {
      throw new Error("Failed to add client");
    }

    const data = await response.json();
    return { id: data.data, ...newClient };
  }
);

const transformFormData = (newClient) => {
  return {
    email: newClient.email,
    favoriteEventTypes: newClient.favoriteEventTypes.value,
    name: newClient.firstName,
    lastName: newClient.lastName,
    phone: newClient.phone,
    budget: newClient.totalBudget,
  };
};

// Async thunk to delete a client
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (clientId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    const response = await fetch(`${API_BASE_URL}/Client/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the Bearer token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete client");
    }

    // fetch the updated list of clients after deletion with the current page and page size depending on the totalPages
    let currentPage = state.clients.currentPage;
    const pageSize = state.clients.pageSize;
    const total = state.clients.total - 1;
    const totalPages = Math.ceil(total / pageSize);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const updatedClientsResponse = await fetch(
      `${API_BASE_URL}/Client/list?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      }
    );

    if (!updatedClientsResponse.ok) {
      throw new Error("Failed to fetch updated clients");
    }

    const updatedClientsData = await updatedClientsResponse.json();
    return updatedClientsData;
  }
);

const INITIAL_STATE = {
  clients: [],
  total: 0,
  totalPages: 0,
  pageSize: 8,
  currentPage: 1,
  status: "idle",
  error: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState: INITIAL_STATE,
  reducers: {
    updateClientTrip: (state, action) => {
      const { clientId, nextTripDate, location } = action.payload;
      const client = state.clients.find((client) => client.id === clientId);
      if (client) {
        client.nextTripDate = format(new Date(nextTripDate), "dd/MM/yyyy");
        client.location = location;
      }
    },
    clearClientTrip: (state, action) => {
      const { clientId } = action.payload;
      const client = state.clients.find((client) => client.id === clientId);
      if (client) {
        client.nextTripDate = null;
        client.location = null;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload.data.list.map((client) => ({
          id: client.id,
          firstName: client.name,
          lastName: client.lastName,
          email: client.email,
          phone: client.phone,
          totalBudget: client.budget,
          favoriteEventTypes: {
            value: client.favoriteEventType,
            label: client.favoriteEventTypeDescription,
          },
          nextTripDate:
            client.nextTripDate !== "0001-01-01T00:00:00+00:00"
              ? format(new Date(client.nextTripDate), "dd/MM/yyyy")
              : null,
          location: client.nextTripLocation,
        }));
        state.total = action.payload.data.totalItems;
        state.totalPages = action.payload.data.totalPages;
        state.pageSize = action.payload.data.size;
        state.currentPage = action.payload.data.currentPage;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push({
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          phone: action.payload.phone,
          totalBudget: action.payload.totalBudget,
          favoriteEventTypes: action.payload.favoriteEventTypes,
          nextTripDate: null,
          location: null,
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
      .addCase(addClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = action.payload.data.list.map((client) => ({
          id: client.id,
          firstName: client.name,
          lastName: client.lastName,
          phone: client.phone,
          email: client.email,
          budget: client.budget,
          favoriteEventTypes: {
            value: client.favoriteEventType,
            label: client.favoriteEventTypeDescription,
          },
          nextTripDate:
            client.nextTripDate !== "0001-01-01T00:00:00+00:00"
              ? format(new Date(client.nextTripDate), "dd/MM/yyyy")
              : null,
          location: client.nextTripLocation,
        }));
        state.total = action.payload.data.totalItems;
        state.totalPages = action.payload.data.totalPages;
        state.pageSize = action.payload.data.size;
        state.currentPage = action.payload.data.currentPage;
      });
  },
});

export const { updateClientTrip, setCurrentPage, clearClientTrip } = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
