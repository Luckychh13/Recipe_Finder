import axios from 'axios';

const API_URL=import.meta.env.VITE_BACKEND_API_URL+'/api/users';

/**
 * Sends a POST request to the backend to register a new user.
 * @param{object} userData-The user's data (name, email, password).
 * @return{Promise<object>} A promise that resolves to the response data from the backend,
 *                           which includes the new user object and a JWT.
 */
 
export const register=async(userData)=>{
    try{
        const response=await axios.post(`${API_URL}/register`,userData);
        return response.data;
    }catch (error) {
    // If the backend returns an error (e.g., email already exists), axios will throw an error.
    // We log the detailed error for debugging and then re-throw it so the calling
    // component's catch block can handle it and display a message to the user.
    console.error('Registration failed:', error.response.data);
    throw error.response.data;
  }
};

/**
 * Sends a POST request to the backend to log in a user.
 * @param {object} userData - The user's credentials (email, password).
 * @returns {Promise<object>} A promise that resolves to the response data from the backend,
 *                            which includes the user object and a JWT.
 */

export const login=async (userData)=>{
    try{
        const response=await axios.post(`${API_URL}/login`,userData);
        return response.data;
    }catch (error) {
    // Handle and re-throw any errors from the backend (e.g., invalid credentials).
    console.error('Login failed:', error.response.data);
    throw error.response.data;
  }
};