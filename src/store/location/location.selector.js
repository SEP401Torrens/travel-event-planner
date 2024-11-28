//import { createSelector } from '@reduxjs/toolkit';
export const selectLocations = (state) => state.locations;

// export const selectLocationCodeById = createSelector(
//   [selectLocations, (state, locationId) => locationId],
//   (locations, locationId) => {
//     const location = locations.find((loc) => loc.id === locationId);
//     return location ? location.code : null;
//   }
// );