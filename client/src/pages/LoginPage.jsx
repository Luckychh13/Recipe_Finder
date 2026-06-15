import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';

const LoginPage = () => {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from=location.state?.from?.pathname||'/';
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    try{
      await loginUser({email, password});
      navigate(from,{replace:true});
  }catch(err){
    setError(err.message || 'Failed to log in.');
  }
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
        Log In
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "rgba(255,255,255,0.7)" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "rgba(255,255,255,0.7)" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
          }}
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
          Log In
        </Button>
      </Box>
    </Box>
  </Container>
);

};

export default LoginPage;