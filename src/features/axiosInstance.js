// src/api/axiosInstance.js
import axios from "axios";
import { store } from "../store/store";
import { logout } from "../features/authSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";


const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            console.log(decoded, "tokennn")
            if (decoded.exp * 1000 < Date.now()) {
                // Token is expired
                store.dispatch(logout());
                toast.error("Session expired. Please log in again.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
                return Promise.reject(new Error("Token expired"));
            }
            config.headers.Authorization = `Bearer ${token}`;
        } catch (e) {
            store.dispatch(logout());
            toast.error("Invalid Session. Please log in again.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            return Promise.reject(new Error("Invalid token"));
        }
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            toast.error("Session expired. Please log in again.");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
