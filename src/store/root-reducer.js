import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./auth/auth.reducer";
import { clientReducer } from "./client/client.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  clients: clientReducer,
});
