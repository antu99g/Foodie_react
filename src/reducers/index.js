import { ADD_FAVOURITE, REMOVE_FAVOURITE } from "../actions";

const localFavourites = localStorage.getItem('FOODIE_FAVOURITES');
const initialState = {
   favourites: localFavourites || [], // List of all habits
};


// Reducer
export default function favourite(state = initialState, action) {
   switch (action.type) {
      case ADD_FAVOURITE: // Reducer for adding new favourite dish
         return {
            ...state,
            favourites: [...state.favourites, action.favourite],
         };

      case REMOVE_FAVOURITE: // Reducer for removing a favourite dish
         const updatedFavourites = state.favourites.filter((id) => action.favourite !== id);
         return {
            ...state,
            favourites: updatedFavourites,
         };

      default:
         return state;
   }
}