// Action types
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";

// Action creators

// Action for adding new habit
export function addFavourite(favourite) {
   return {
      type: ADD_FAVOURITE,
      favourite,
   };
}

// Action for adding 'none' status to each habit when date changes
export function removeFavourite(favourite) {
   return {
      type: REMOVE_FAVOURITE,
      favourite,
   };
}