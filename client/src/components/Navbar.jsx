//Link is used for navigation between pages without reloading the page.
import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import './Navbar.css';

const Navbar=()=>{
    const{user,logout}=useAuth();
    const handlelogout=()=>{
        logout();
    };



return(
    //It tells the browser:
    //“This section is used for navigation links”
    <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" className="navbar-logo">RecipeFinder</Link>
        </div>

        <ul className="navbar-links">
            {user ?(
                <>
                <li className="navbar-greeting">
                   Welcome, {user?.name ?? user?.email}!
                </li> 

                <li>
                 <Link to="/favorites">My Favourites</Link>
                </li>
                <li>
                 <button onClick={handlelogout} className="logout-button">Logout</button>
                </li>
                </>
            ):(
                <>
                 <li>
                    <Link to="/Login">Login</Link>
                 </li>
                 <li>
                    <Link to="/register">Register</Link>
                 </li>
                </>
            )}
        </ul>
    </nav>
);
};

export default Navbar;