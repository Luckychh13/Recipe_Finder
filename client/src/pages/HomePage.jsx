import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import { Container, Grid, Typography, Box } from '@mui/material';
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from '../components/ErrorComponent';

const HomePage=()=>{
    const[query,setQuery]=useState('');
     //Initialize a state variable to hold the recipe search results.
    //    - `recipes` will be the array of recipe objects we get from the API.
    //    - `setRecipes` is the function we will call to update this state.
    const[recipes,setRecipes]=useState([]);
    const [searched,setSearched]=useState(false);
    //Add a new state to track the loading status of a search
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(null);

     const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
   try{
    setError(null);
    setLoading(true);
    const results = await searchRecipes(query);
    setRecipes(results || []);
    setSearched(true);
   }catch(err){
    setError(err.message || 'An error occurred while searching for recipes.');
   }finally{
    setLoading(false);
   }
    };

    if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }
   return (
  <Container
    sx={{
      py: 6,
      position: "relative",
      zIndex: 1, // important so it sits above background overlay
    }}
  >
    {/* Main Title */}
    <Typography
      variant="h3"
      component="h1"
      align="center"
      gutterBottom
      sx={{
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
      }}
    >
      Recipe Finder
    </Typography>

    {/* Subtitle */}
    <Typography
      variant="h6"
      align="center"
      paragraph
      sx={{
        color: "rgba(255,255,255,0.9)",
        textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
      }}
    >
      Discover your next favorite meal. Search for any recipe you can imagine!
    </Typography>

    {/* Search Bar */}
    <Box
  sx={{
    mt: 4,
  }}
>
  <SearchBar
    query={query}
    setQuery={setQuery}
    handleSearch={handleSearch}
  />
</Box>


    {/* Results Section */}
    {recipes.length > 0 && (
      <Grid
        container
        spacing={4}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
        }}
      >
        {recipes.map((recipe) => (
          <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    )}

    {/* No Results Message */}
    {searched && !loading && recipes.length === 0 && (
      <Typography
        align="center"
        sx={{
          mt: 4,
          color: "white",
          textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
        }}
      >
        No recipes found for "{query}". Please try another search.
      </Typography>
    )}
  </Container>
);

};
export default HomePage;