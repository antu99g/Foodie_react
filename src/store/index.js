import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./slices/favoriteSlice";

const store = configureStore({
  reducer: {
    favorites: favoriteSlice,
  },
});

export default store;
