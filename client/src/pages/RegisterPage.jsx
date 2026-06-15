import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { register } from '../services/authService';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const RegisterPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (error) setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // register user
    await register(formData);

    // login immediately
    await loginUser(formData.email, formData.password);

    // go home
    navigate("/");
  } catch (err) {
    setError(err.message || "Registration failed");
  }
};

  const textFieldStyles = {
    input: { color: "white" },
    label: { color: "rgba(255,255,255,0.7)" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.3)",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff8e53",
      },
    },
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
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
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          Create an Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={textFieldStyles}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={textFieldStyles}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            sx={textFieldStyles}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: 2,
              background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
              "&:hover": {
                background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
