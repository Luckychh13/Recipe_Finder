import React, { Component } from "react";
import{Link as RouterLink} from'react-router-dom';
import{Box,Typography,Button,Container} from'@mui/material';

const NotFoundPage=()=>{
   return (
  <Container
    component="main"
    maxWidth="md"
    sx={{
      py: 8,
      position: "relative",
      zIndex: 1,
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* 404 Number */}
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "white",
          textShadow: "3px 3px 10px rgba(0,0,0,0.8)",
        }}
      >
        404
      </Typography>

      {/* Title */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          color: "white",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        Oops! Page Not Found.
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "rgba(255,255,255,0.9)",
          textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
        }}
      >
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        component={RouterLink}
        to="/"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontWeight: "bold",
        }}
      >
        Go to Homepage
      </Button>
    </Box>
  </Container>
);

}; 

export default NotFoundPage;