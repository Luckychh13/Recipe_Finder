import{useEffect, useState,useContext} from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import { addFavorite } from '../services/favoriteService';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';

import { Container, Grid, Box, Typography, Button, Stack, Alert } from '@mui/material';
const RecipePage=()=>{
       // 2. Call the `useParams` hook to get an object of the URL parameters.
       //We can use object destructuring to directly pull out the `recipeId`
       // property, which corresponds to the `:recipeId` in our Route path.

       //useParams() is a function from React Router that says:
      //"Hey, look at the current URL and give me all the variable parts!"
      /*const params = useParams();       // Get the whole object
       const recipeId = params.recipeId; // Pull out recipeId */
       const {recipeId}=useParams();
       // Initialize state for the recipe details. We start with `null` because we don't have a recipe yet.
       const[recipe,setRecipe]=useState(null);
       //Initialize a loading state. We start with `true` because we will begin fetching data immediately.
       //This is crucial for providing feedback to the user
       const[loading,setLoading]=useState(true);

       const{user}=useContext(AuthContext);
       const[feedback,setFeedback]=useState({message:'',type:''});
        const[error,setError]=useState(null);
       //Use the useEffect hook to fetch data when the component mounts or recipeId changes.
       useEffect(()=>{
        //Define an async function inside the effect to handle the data fetching.
        //This is the standard pattern for async operations in useEffect.
        const fetchRecipeDetails=async()=>{
        try{
            setLoading(true);// Ensure loading is true at the start of the fetch.
            setError(null);
            const data=await getRecipeById(recipeId);
            setRecipe(data);
        }catch(error){
            setError(error.message || 'An error occurred while fetching the recipe details.');
            console.error('Failed to fetch recipe details',error);
        }
        // This `finally` block ensures that loading is set to false after the
        // fetch attempt is complete, whether it succeeded or failed.
        finally{
            setLoading(false);
        }
       };
       //calls the async function
       fetchRecipeDetails();
        //The dependency array. This is the most critical part of this hook.
       //By including `[recipeId]`, we are telling React: "Please re-run this effect
       //if, and only if, the value of `recipeId` changes."
       //This ensures that if a user navigates from one recipe page directly to
       //another, the component will re-fetch the data for the new recipe.
    },[recipeId]);

    const handleSaveToFavorites=async()=>{
        setFeedback({message:'',type:''});

        try{
            const response=await addFavorite(recipe.idMeal);
            setFeedback({message:response.message||'Saved to favorites!',type:'success'});
        }catch(err){
           console.error('Failed to fetch recipe details', err);
            setFeedback({message:err.message ||'failed to save favorite.',type:'error'});
        }
    };
     if(loading){
        return <LoadingSpinner />;
    }
    
      if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }
  if (!recipe) {
  return (
    <Container sx={{ py: 4 }}>
      <Typography align="center">
        Recipe not found.
      </Typography>
    </Container>
  );
}

   const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      }
    }
    return ingredients;
  };
   
       return (
  <Container
    maxWidth="lg"
    sx={{
      py: 6,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        width: "100%",
        p: 4,
        borderRadius: 3,
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        color: "white",
      }}
    >
      <Grid container spacing={5} alignItems="flex-start">
        
        {/* Left Column: Image */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          />
        </Grid>

        {/* Right Column: Details */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            
            <Typography variant="h3" fontWeight="bold">
              {recipe.strMeal}
            </Typography>

            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              Category: {recipe.strCategory} | Area: {recipe.strArea}
            </Typography>

            {user && (
              <Button
                variant="contained"
                onClick={handleSaveToFavorites}
                sx={{
                  alignSelf: "flex-start",
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  borderRadius: 2,
                  background:
                    "linear-gradient(45deg, #ff6b6b, #ff8e53)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #ff8e53, #ff6b6b)",
                  },
                }}
              >
                Save to Favorites
              </Button>
            )}

            {feedback.message && (
              <Alert severity={feedback.type}>
                {feedback.message}
              </Alert>
            )}

            {/* Ingredients */}
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Ingredients
              </Typography>
              {getIngredients().map((ing, index) => (
                <Typography
                  key={index}
                  sx={{ opacity: 0.9, mb: 0.5 }}
                >
                  • {ing}
                </Typography>
              ))}
            </Box>

            {/* Instructions */}
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Instructions
              </Typography>
              <Typography
                sx={{
                  whiteSpace: "pre-wrap",
                  opacity: 0.9,
                  lineHeight: 1.8,
                }}
              >
                {recipe.strInstructions}
              </Typography>
            </Box>

          </Stack>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

};

export default RecipePage;