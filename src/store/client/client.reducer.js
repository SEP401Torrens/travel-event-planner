import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

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


export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockClients);
      }, 1000); 
    });

    //   const response = await fetch("/api/clients");
    //     const data = await response.json();
    //     return data;
  }
);

// Async thunk to add a new client
export const addClient = createAsyncThunk('clients/addClient', async (newClient) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...newClient, id: Date.now() }); 
    }, 500); 
  });
});


// export const addClient = createAsyncThunk('clients/addClient', async (newClient) => {
//   const response = await fetch('/api/clients', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newClient),
//   });
//   const data = await response.json();
//   return data;
// });

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateClientTrip: (state, action) => {
      const { clientId, nextTripDate, location } = action.payload;
      const client = state.clients.find((client) => client.id === clientId);
      if (client) {
        client.nextTripDate = format(new Date(nextTripDate), 'dd/MM/yyyy');
        client.location = location;
      }
    },
  },
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
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      });
  },
});

export const { updateClientTrip} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
