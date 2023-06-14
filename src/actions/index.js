// Action types
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

// Action creators

// Action for adding new habit
export function addFavorite(favorite) {
  return {
    type: ADD_FAVORITE,
    favorite,
  };
}

// Action for adding 'none' status to each habit when date changes
export function removeFavorite(favorite) {
  return {
    type: REMOVE_FAVORITE,
    favorite,
  };
}
