import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = [
  { id: 0, name: "Sports" },
  { id: 1, name: "Miscellaneous" },
  { id: 2, name: "Music" },
  { id: 3, name: "Arts & Theatre" },
  { id: 4, name: "Film" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  reducers: {},
});
export const categoriesReducer = categoriesSlice.reducer;
