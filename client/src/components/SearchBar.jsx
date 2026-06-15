//- { useState } is a special React tool (a hook) that lets your component remember values (like what the user typed).
import{Box,TextField,Button}from'@mui/material';
//This defines a new component called SearchBar.
//Think of it like a reusable Lego block you can drop into your app.
const SearchBar=({query,setQuery,handleSearch})=>{

  return (
  <Box
    component="form"
    onSubmit={handleSearch}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 4,
    }}
  >
    <TextField
      variant="outlined"
      placeholder="Search for a recipe..."
      fullWidth
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{
        input: { color: "white" },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(255,255,255,0.15)", // light glass
          backdropFilter: "blur(10px)",
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.6)",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ff9800",
          },
        },
      }}
    />

    <Button
      type="submit"
      variant="contained"
      sx={{
        height: "56px",
        px: 4,
        fontWeight: "bold",
      }}
    >
      Search
    </Button>
  </Box>
);


};
export default SearchBar;

