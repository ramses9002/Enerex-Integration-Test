// services/authServices.js
import axiosInstance from "./useAxios";

const authServices = {
    auth: async (data = {}) => {
        try {
            const response = await axiosInstance.post("/api/Login/Authorize", data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default authServices;
