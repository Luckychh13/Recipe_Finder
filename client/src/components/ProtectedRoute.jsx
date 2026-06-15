import{Navigate,useLocation}from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute=({children})=>{
    const{user,loading}=useAuth();
    //Get the current location object. This contains information about the current URL.
    // We'll use this to redirect the user back to their intended page after they log in.
    const location=useLocation();

    if(loading){
        return<div>Loading...</div>;
    }

    if(!user){
        return<Navigate to="/login" replace state={{from:location}} />;
    }
    return children;
};

export default ProtectedRoute;