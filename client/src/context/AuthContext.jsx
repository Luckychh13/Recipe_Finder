import{createContext,useState,useEffect,useContext}from 'react';
import{useNavigate}from'react-router-dom';
import { login as loginApi } from '../services/authService';
//This function parseJwt is used to read the payload part of a JWT (JSON Web Token). A JWT has three parts separated by dots:
// header.payload.signature
const parseJwt=(token)=>{
    try{
         // 1. Split the token by '.' and take the second part (the payload)
         // 2. Decode it from base64 using `atob` (turns it into a readable string)
        // 3. Convert the string into a JavaScript object using JSON.parse
        //example--abc.eyJ1c2VybmFtZSI6ICJKb2huIn0.def
        //token.split('.')[1] → "eyJ1c2VybmFtZSI6ICJKb2huIn0" (this is the payload in base64)
        //atob(...) → {"username": "John"} (decoded string)
        //JSON.parse(...) → { username: "John" } (JavaScript object you can use in your code)
        return JSON.parse(atob(token.split('.')[1]));
    }catch(e){
        return null;
    }
};
/**This line creates a Context in React. A context allows you to share data (like the logged-in user info) across your app without passing props manually through every component.
createContext(null):
null is the default value of the context before it gets a real value.
It means: “By default, there is no user logged in.”
export:
This makes it usable in other files. For example, you can import it in a component and use useContext(AuthContext) to get the user info.
Analogy: Think of AuthContext as a shared box in which you can put the logged-in user’s info, so any component in your app can open the box and read it. */
export const AuthContext=createContext(null);

export const useAuth=()=>{
    return useContext(AuthContext);
}
// This component will wrap our application and manage the authentication state.
// It takes `children` as a prop, which will be the rest of our application components.
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            const decodeUser=parseJwt(token);
            /* decodeUser exists → the token was valid and could be decoded.
            decodeUser.exp * 1000 > Date.now() → the token has not expired.
            Why * 1000?
            JWT exp is in seconds, but Date.now() is in milliseconds. Multiplying by 1000 converts seconds → milliseconds.
            If this is true → the token is still valid. */
            if(decodeUser && decodeUser.exp*1000>Date.now()){
                setUser({
                    id:decodeUser.id,
                    name:decodeUser.name,
                    email:decodeUser.email,
                });
            }else{
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
        /*The [] at the end is the dependency array for useEffect.
        An empty array means: “Run this effect only once when the component first loads.”
        So this token check happens once at startup and not again unless the page reloads. */
    },[]);
       const loginUser = async (email, password) => {

        
    const data = await loginApi( email, password );
    


    // store token
    localStorage.setItem('token', data.token);
   

    const decoded = parseJwt(data.token);
    if (!decoded) {
  throw new Error("Invalid token received from server");
}

    setUser({
  id: decoded.id,
  name: decoded.name,
  email: decoded.email
});
  };
        const logout=()=>{
            setUser(null);
            localStorage.removeItem('token');
            navigate('/');
        };
        const authContextValue={
            user,
            loading,
            loginUser,
            logout
        };

        return(
            <AuthContext.Provider value={authContextValue}>
                {!loading && children}
            </AuthContext.Provider>
        );
};

