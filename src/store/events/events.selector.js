import { createSelector } from "@reduxjs/toolkit";

export const selectEventsState = (state) => state.events;

export const selectEvents = createSelector(
  [selectEventsState, (state, tripId) => tripId],
  (eventsState, tripId) => eventsState.events[tripId] || []
);

export const selectEventsStatus = createSelector(
  [selectEventsState],
  (eventsState) => eventsState.status
);

export const selectEventsError = createSelector(
  [selectEventsState],
  (eventsState) => eventsState.error
);
