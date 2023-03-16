const API_PREFIX = "https://www.themealdb.com/api/json/v1/1";

// Function for fetching all categories
export const fetchCategories = async () => {
   let res = await fetch(API_PREFIX + '/categories.php');
  let json = await res.json();

  return json.categories;
}

// Function for fetching dish with its id
export const fetchMealById = async (id) => {
   let res = await fetch(API_PREFIX + `/lookup.php?i=${id}`);
  let json = await res.json();

  return json.meals[0];
}

// Function for fetching dish with its name
export const fetchMealByName = async (dishName) => {
   let res = await fetch(API_PREFIX + `/search.php?s=${dishName}`);
   let json = await res.json();

   return json.meals;
};

// Function for fetching dish with its name
export const fetchSearchSuggestion = async (keyword) => {
   let res = await fetch(API_PREFIX + `/search.php?s=${keyword}`);
   let json = await res.json();

   // Sending first 7 meals in response
   let selectedMeals;
   if(json.meals !== null){
      selectedMeals = json.meals.length > 7 ? json.meals.slice(0, 7) : json.meals;
   } else {
      selectedMeals = null;
   }
   return selectedMeals;
};

// Function for fetching all areas
export const searchAllCuisines = async () => {
   let res = await fetch(API_PREFIX + "/list.php?a=list");
   let json = await res.json();

   return json.meals;
};