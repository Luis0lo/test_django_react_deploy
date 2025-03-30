import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null); 

    useEffect(() => {
        auth().catch(()=>setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } else {
            setIsAuthorized(false);
            return
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
    
};

export default ProtectedRoute;
