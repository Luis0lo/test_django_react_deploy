import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/loginRegiaterForm.css";
import LoadingIndicator from "./LoadingIndicator";
const LoginRegisterForm = ({route, method}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        console.log("Sending Data:", { username, password })
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await api.post(route,{
                username,
                password
            });
            console.log(response.data);
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                console.log("Navigating to home page")
                navigate("/")
            }else{
                navigate("/login")
            }
        }catch (error) {
            alert(error)
        }finally {
            setIsLoading(false)
        }
        
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input className="form-input" placeholder="Username" type="text" 
        value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="form-input" placeholder="Password" type="password" 
        value={password} onChange={(e) => setPassword(e.target.value)} />
        {isLoading && <LoadingIndicator />}
        <button className="form-button" type="submit">{name}</button>
    </form>
}

export default LoginRegisterForm;
