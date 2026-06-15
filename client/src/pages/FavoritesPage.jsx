import{useState,useEffect} from "react";
import { getFavorites,removeFavorites,updateFavoriteNote} from "../services/favoriteService";
import { getRecipeById } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import { Container,Grid,Typography,Button,Box,Paper } from "@mui/material";
import NotesEditModal from "../components/NotesEditModal";

const FavoritesPage=()=>{
    const[favoriteRecipes,setFavoriteRecipes]=useState([]); 
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[isModalOpen,setIsModalOpen]=useState(false);
    const[selectedRecipe,setSelectedRecipe]=useState(null);

    useEffect(()=>{
        const fetchAndProcessFavorites=async()=>{
            try{
                setError(null);
                setLoading(true);
                const favoriteObjects=await getFavorites();

                if(favoriteObjects.length===0){
                    setFavoriteRecipes([]);
                    setLoading(false);
                    return;
                }
                //From each favorite, give me only the recipeId.
                const recipeIds = favoriteObjects.map(fav => fav.recipeId);
                //Create an array of promises. Each promise is a call to fetch the full
               //details for a single recipe ID. We use .map() to transform our array of IDs
               //into an array of API call promises.
                const recipeDetailPromises=recipeIds.map(id=>getRecipeById(id));
                //Use Promise.all to wait for all the promises to resolve. This returns a new promise
                //that resolves to an array of results once all the input promises have resolved.
                const fetchedRecipeDetails=await Promise.all(recipeDetailPromises);
                // We now combine the full recipe details with the notes from our backend.
                //We map over the `fetchedRecipeDetails` and for each recipe, we find its
                //corresponding note from the `favoriteObjects` array.
                const combinedFavorites = fetchedRecipeDetails.map(recipe => {
                 // Find the original favorite object to get its note.
                 const userFavoriteData = favoriteObjects.find(
                  fav => String(fav.recipeId) === String(recipe.idMeal)
               );

          // Return a new, merged object.
          return {
            ...recipe, // All properties from TheMealDB (idMeal, strMeal, etc.)
            notes: userFavoriteData ? userFavoriteData.notes : '', // Add the notes property
          };
        });
                setFavoriteRecipes(combinedFavorites);
                
            }catch(err){
                setError(err.message||'An error occured while fetching your favorites');
            }finally{
                setLoading(false);
            }
        };
        fetchAndProcessFavorites();
    },[]);

    const handleRemoveFavorite=async(recipeId)=>{
       try{
         await removeFavorites(recipeId);

         setFavoriteRecipes((prevRecipes)=>
            prevRecipes.filter((recipe)=> recipe.idMeal !==recipeId)
          );
        }catch(err){
        console.error('Failed to remove favorite:',err);
        alert(err.message || 'could not remove favorites.Please try again');
    }
};
const handleOpenModal=(recipe)=>{
  setSelectedRecipe(recipe);
  setIsModalOpen(true);
};
const handleCloseModal=()=>{
  setIsModalOpen(false);
  setSelectedRecipe(null);
};
const handleSaveNotes=async(recipeId,newNotes)=>{
  try{
    await updateFavoriteNote(recipeId,newNotes);
    setFavoriteRecipes(prevRecipes => 
        prevRecipes.map(recipe => {
          // If the recipe's ID matches the one we just updated...
          if (recipe.idMeal === recipeId) {
            // ...return a new object with all the old properties, but with the new notes.
            return { ...recipe, notes: newNotes };
          }
          // Otherwise, return the recipe unchanged.
          return recipe;
        })
      );
      handleCloseModal();
  }catch(err){
    console.error('Failed to save notes:',err);
    alert(err.message||'could not save notes.Please try again');
  }
};
    if(loading){
        return <LoadingSpinner />;
    }
    if(error){
        return (
      <Container sx={{ py: 4 }}>
        <ErrorComponent message={error} />
      </Container>
    );
  }
   return (
  <>
    <Container
      sx={{
        py: 6,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Title */}
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
        My Favorite Recipes
      </Typography>

      {favoriteRecipes.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          sx={{
            mt: 4,
            color: "rgba(255,255,255,0.9)",
            textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
          }}
        >
          You haven't saved any favorite recipes yet. Start exploring!
        </Typography>
      ) : (
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
          {favoriteRecipes.map((recipe) => (
            <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                
                {/* Recipe Card */}
                <RecipeCard recipe={recipe} />

                {/* Notes Section */}
                <Paper
  elevation={0}
  sx={{
    p: 2,
    mt: -1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    color: "white",
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 1,
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: "bold",
        color: "rgba(255,255,255,0.85)",
      }}
    >
      My Notes:
    </Typography>

    <Button
      variant="outlined"
      size="small"
      onClick={() => handleOpenModal(recipe)}
      sx={{
        borderColor: "#ff9800",
        color: "#ff9800",
        fontWeight: "bold",
        "&:hover": {
          borderColor: "#ffa726",
          backgroundColor: "rgba(255,152,0,0.1)",
        },
      }}
    >
      Edit
    </Button>
  </Box>

  {recipe.notes ? (
    <Typography
      variant="body2"
      sx={{
        fontStyle: "italic",
        whiteSpace: "pre-wrap",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      {recipe.notes}
    </Typography>
  ) : (
    <Typography
      variant="body2"
      sx={{
        fontStyle: "italic",
        color: "rgba(255,255,255,0.6)",
      }}
    >
      No notes yet. Add one!
    </Typography>
  )}
</Paper>


              
                <Button
                  onClick={() => handleRemoveFavorite(recipe.idMeal)}
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{
                    mt: -1,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>

    {selectedRecipe && (
      <NotesEditModal
        open={isModalOpen}
        onClose={handleCloseModal}
        recipe={selectedRecipe}
        onSave={handleSaveNotes}
      />
    )}
  </>
);

};

export default FavoritesPage;