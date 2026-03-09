import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../services/authService";

const API_URL = import.meta.env.VITE_API_URL;
const token = getToken()    
const navigate = useNavigate();
const authUser = async () => {
    
    if (!token) {
        console.warn("No token found. Redirecting to login...");
        clearToken();    
        navigate("/");          
        return;
    }

    try {
    const res = await fetch(`${API_URL}/api/auth/profile/me`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
    });        
    
    if (!res.ok) {
        if (res.status === 401) {
            // Token is invalid or expired
            console.warn("Token expired or invalid. Clearing and redirecting...");
            clearToken();
            navigate("/");  
        }
        throw new Error(`Request failed with status ${res.status}`);
    }
    }
    catch(error){
        console.error("User info error:", error);
    }
}


export default function authenticate() {
    authUser();
}