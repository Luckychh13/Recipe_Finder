// src/services/recipeService.js

// Import the axios library, which we will use to make HTTP requests.
import axios from 'axios';

// Retrieve the API's base URL from the Vite environment variables.
// The 'import.meta.env' object is where Vite exposes these variables.
// This line securely gets the 'https://www.themealdb.com/api/json/v1/1/' string
// that you stored in your .env.local file.
const API_URL=import.meta.env.VITE_RECIPE_API_URL;

//Think of axios.create like making your own delivery boy who always knows where your favorite restaurant is.
//axios = the delivery service (it can fetch stuff from anywhere).
//axios.create({ baseURL: API_URL }) = you hire a special delivery boy who always starts from one restaurant (the API_URL).
//recipeApi = your personal delivery boy who only goes to that restaurant.
//So instead of telling him the full address every time, you just say the dish name, and he knows where to get it.
const recipeApi=axios.create({
    baseURL:API_URL,
});

// Export the configured axios instance as the default export from this module.
// This allows other parts of our application (like components or custom hooks)
// to import and use this pre-configured instance for making API calls.
     /*export default recipeApi;*/
// We are no longer exporting the instance as default, but rather named exports for our functions.
// This is a common pattern for service files with multiple functions.
/**
 * searches for recipes based on a query string
@param {string} query-the search terms
@returns {Promise<Array>} a promise that resolves to an array of meal objects
*                       returns an empty array if no meals are found or if an error occurs
 */

export const searchRecipes=async(query)=>{
    try{
           // Make an asynchronous GET request to the 'search.php' endpoint.
           // We use a template literal to inject the user's search query into the URL's 's' parameter.
           // The 'await' keyword pauses the function execution until the promise from recipeApi.get() is resolved.
        const response=await recipeApi.get(`/search.php?s=${query}`);
         // The actual data from an axios response is contained in the 'data' property.
         // TheMealDB API returns an object: { meals: [...] } if successful, or { meals: null } if no results.
         // To make our component's job easier, we check if `response.data.meals` exists.
         // If it does, we return it. If it's null or undefined, we return an empty array [].
         // This provides a consistent return type, preventing errors when trying to map over a null value.
         return response.data.meals ||[];
    }catch(error){
        console.error('Error fetching recipies:',error);
        //empty array in case of an error
        return [];
    }
};

/**
 * @param{string} id-the id of the recipe to fetch
 * @returns{promise<object|null} a promise that resolves a single meal object or null if not found
 */
export const getRecipeById=async(id)=>{
    try{
        const response=await recipeApi.get(`lookup.php?i=${id}`);
        return response.data.meals?response.data.meals[0]:null;
    }catch(error){
        console.error(`Error fetching recipe by id${id}:`,error);
        return null;
    }
};