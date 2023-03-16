import { configureStore } from "@reduxjs/toolkit";
import favourites from '../reducers';

const store = configureStore({
   reducer: favourites,
});

export default store;