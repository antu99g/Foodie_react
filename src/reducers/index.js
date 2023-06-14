import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions";

const initialState = {
  favorites: [],
};

// Reducer
export default function favorite(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE: // Reducer for adding new favorite dish
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };

    case REMOVE_FAVORITE: // Reducer for removing a favorite dish
      const updatedFavorites = state.favorites.filter(
        (id) => action.favorite !== id
      );
      return {
        ...state,
        favorites: updatedFavorites,
      };

    default:
      return state;
  }
}
