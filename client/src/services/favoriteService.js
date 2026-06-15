import axios from "axios";
//base url for our backend api
const API_URL=`${import.meta.env.VITE_BACKEND_API_URL}/api/favorites`;

export const addFavorite=async(recipeId)=>{
    //retrive the jwt from the localstorage user authentication
    const token=localStorage.getItem('token');

    if(!token){
        throw new Error('You must be logged in to add a favorite ');
    }

    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
    };
    //creating an object same as of our backend
    const body={recipeId};
    try{
        const response=await axios.post(API_URL,body,config);
        return response.data;
    }catch(error){
      throw error.response.data|| new Error('An unknown error occured');
    }
};

export const getFavorites=async()=>{
    const token=localStorage.getItem('token');

    if(!token){
        throw new Error('Authentication token not found.');
    }
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
    };
    try{
        const response=await axios.get(API_URL,config);
        return response.data;
    }catch(error){
        throw error.response.data||new Error('Failed to fetch favorites.');
    }
};

export const removeFavorites=async(recipeId)=>{
    const token=localStorage.getItem('token');
    if(!token){
        throw new Error('Authentication token not found');
    }
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
    };

    try{
        const response=await axios.delete(`${API_URL}/${recipeId}`,config);
        return response.data;
    }catch(error){
        throw error.response.data || new Error('Failed to remove favorite.');
    }
};

export const updateFavoriteNote = async (recipeId, notes) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token not found.');
  }

    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = { notes };

  try {
    const response = await axios.put(`${API_URL}/${recipeId}`, body, config);
    
  } catch (error) {
    throw error.response?.data || new Error('Failed to update notes.');
  }
};