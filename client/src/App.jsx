import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import bgImage from "./assests/bg.jpg";
import{Box}from '@mui/material';
function App(){
  return(
   <Box sx={{ 
    position:'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
      }}>
    <Box
      sx={{
       position: "absolute",
       inset: 0,
       background: `
       linear-gradient(
        135deg,
        rgba(0,0,0,0.4) 0%,
        rgba(0,0,0,0.4) 40%,
        rgba(0,0,0,0.4) 100%
        )`,
        zIndex: 0,
      }}
    />
     <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } 
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      </Box>
    </Box>
  );
}

export default App;
