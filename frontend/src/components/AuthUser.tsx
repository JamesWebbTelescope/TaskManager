import { clearToken, getToken } from "../services/authService";


export default async function authenticate() {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = getToken()    
    
    if (!token) {
        console.warn("No token found.");
        clearToken();            
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
            console.warn("Token expired or invalid. Clearing token...");
            clearToken();
        }
        throw new Error(`Request failed with status ${res.status}`);
    }
    }
    catch(error){
        console.error("User info error:", error);
    }
}