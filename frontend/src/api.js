// at the end we use api rather than axios
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
const apiUrl = "/choreo-apis/django-react-test/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl
});

// this add info in our request so we don't need to add everytime
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log('token', token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;