import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

export const mockClients = [
  {
    id: 1,
    firstName: "Nicole",
    lastName: "Fisher",
    phone: "8090001111",
    nextTripDate: "2024-11-22T15:50:36.670Z",
    location: "Dominican Rep.",
  },
  {
    id: 2,
    firstName: "James",
    lastName: "Carter",
    phone: "8090001111",
    nextTripDate: "2024-11-22T15:50:36.670Z",
    location: "United States",
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Johnson",
    phone: "8090001111",
    nextTripDate: "2024-11-22T15:50:36.670Z",
    location: "Canada",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Johnson",
    phone: "8090001111",
    nextTripDate: "2024-11-22T15:50:36.670Z",
    location: "Canada",
  },
  {
    id: 5,
    firstName: "Emily",
    lastName: "Johnson",
    phone: "8090001111",
    nextTripDate: "2024-11-22T15:50:36.670Z",
    location: "Canada",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Johnson",
    phone: "8090001111",
    nextTripDate: "2024-11-22T15:50:36.670Z",
    location: "Canada",
  },
  {
    id: 7,
    firstName: "Emily",
    lastName: "Johnson",
    phone: "8090001111",
    nextTripDate: "2024-11-22T15:50:36.670Z",
    location: "Canada",
  },
];

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// simulate to fetch clients
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async ({ currentPage, pageSize, searchTerm }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredClients = mockClients;
        console.log("searchTerm", searchTerm);
        if (searchTerm) {
          filteredClients = filteredClients.filter((client) =>
            `${client.firstName} ${client.lastName}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedClients = filteredClients.slice(
          startIndex,
          startIndex + pageSize
        );
        resolve({
          message: "Success",
          status: 0,
          data: {
            totalPages: Math.ceil(filteredClients.length / pageSize),
            totalItems: filteredClients.length,
            currentPage,
            size: pageSize,
            list: paginatedClients.map((client) => ({
              id: client.id,
              name: client.firstName,
              lastName: client.lastName,
              email: "example@example.com",
              phone: "123-456-7890",
              budget: 1000,
              favoriteEventType: 1,
              favoriteEventTypeDescription: "Music",
              nextTripLocation: client.location,
              nextTripDate: client.nextTripDate,
            })),
          },
        });
      }, 1000); // Simulate a network delay
    });
  }
);

//  simulate to add a new client
export const addClient = createAsyncThunk(
  "clients/addClient",
  async (newClient, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newClientWithId = {
          ...newClient,
          id: mockClients.length + 1,
          nextTripDate: newClient.nextTripDate || "2024-11-22T15:50:36.670Z", // Default date if not provided
        };
        mockClients.push(newClientWithId); // Add the new client to the mock data

        const state = thunkAPI.getState();
        const { clients, pageSize, currentPage } = state.clients;
        const totalClients = clients.length + 1;
        const totalPages = Math.ceil(totalClients / pageSize);

        const newCurrentPage =
          clients.length % pageSize === 0 ? currentPage + 1 : currentPage;

        console.log("newCurrentPage", newCurrentPage);
        resolve({
          ...newClientWithId,
          totalPages,
          currentPage: newCurrentPage,
        });
      }, 500);
    });
  }
);

// simulate to delete client
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (clientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(clientId);
      }, 1000); // Simulate a network delay
    });
  }
);

//  // Async thunk to fetch clients with pagination and search
// export const fetchClients = createAsyncThunk(
//   'clients/fetchClients',
//   async ({ currentPage, pageSize, searchTerm }) => {
//     let url = `${API_BASE_URL}/Client/list?currentPage=${currentPage}&pageSize=${pageSize}`;
//     if (searchTerm) {
//       url += `&searchTerm=${searchTerm}`;
//     }

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Failed to fetch clients');
//     }

//     const data = await response.json();
//     return data;
//   }
// );

// to add new a client
// export const addClient = createAsyncThunk('clients/addClient', async (newClient) => {
//   const response = await fetch(`${API_BASE_URL}/Client`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newClient),
//   });
//   const data = await response.json();
//   return data;
// });

//   to delete a client
// export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientId) => {
//   const response = await fetch(`${API_BASE_URL}/Client/${clientId}`, {
//     method: 'DELETE',
//   });

//   if (!response.ok) {
//     throw new Error('Failed to delete client');
//   }

//   return clientId;
// });

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    total: 0,
    totalPages: 0,
    pageSize: 8,
    currentPage: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    updateClientTrip: (state, action) => {
      const { clientId, nextTripDate, location } = action.payload;
      const client = state.clients.find((client) => client.id === clientId);
      if (client) {
        client.nextTripDate = format(new Date(nextTripDate), "dd/MM/yyyy");
        client.location = location;
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
          phone: client.phone,
          nextTripDate: format(new Date(client.nextTripDate), "dd/MM/yyyy"),
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
        console.log(" action.payload addClient", action.payload);
        state.clients.push({
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.phone,
          nextTripDate: action.payload.nextTripDate,
          location: action.payload.location,
        });
        state.total += 1;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        const clientId = action.payload;
        const clientIndex = state.clients.findIndex(
          (client) => client.id === clientId
        );
        if (clientIndex !== -1) {
          console.log("state.total", state.total)
          console.log("state.pageSize", state.pageSize)
          state.clients.splice(clientIndex, 1);
          state.total -= 1;
          state.totalPages = Math.ceil(state.total / state.pageSize);

          // if the current page is now empty move to the previous page
          if (state.clients.length === 0 && state.currentPage > 1) {
            state.currentPage -= 1;
          }

          const startIndex = (state.currentPage - 1) * state.pageSize;
          const endIndex = startIndex + state.pageSize;
          state.clients = mockClients.slice(startIndex, endIndex);
        }
      });
  },
});

export const { updateClientTrip, setCurrentPage } = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
