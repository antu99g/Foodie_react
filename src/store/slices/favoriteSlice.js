import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload);
    },
    removeFavorite(state, action) {
      const index = state.findIndex((id) => id === action.payload);
      state.splice(index, 1);
      // state.filter((id) => action.payload !== id);
    },
  },
});

export default favoriteSlice.reducer;

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
