// services/axiosService.js
import axios from "axios";
import { showToast } from "../components/Notifier";
// const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: "",
});

// Interceptores
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("key_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status) {
            switch (status) {
                case 401:
                    showToast("The token is invalid; you must authenticate.", "error");
                    break;
                case 403:
                    showToast("You do not have permission for this operation.", "error");
                    break;
                case 404:
                    break;
                case 500:
                    showToast("An error occurred on the server. Please try again later.", "error");
                    break;
                default:
                    showToast(error?.message, "error");
            }
        } else {
            showToast(error?.message, "error");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
