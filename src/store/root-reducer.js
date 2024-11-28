import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./auth/auth.reducer";
import { clientReducer } from "./client/client.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { locationsReducer } from "./location/location.reducer";
import { clientTripsReducer } from "./client/client.trip.reducer";
import { eventsReducer } from "./events/events.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  clients: clientReducer,
  categories: categoriesReducer,
  locations: locationsReducer,
  clientTrips: clientTripsReducer,
  events: eventsReducer
});
