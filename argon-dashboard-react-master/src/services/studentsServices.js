import axiosInstance from "./useAxios";

const studentsServices = {
    getStudents: async () => {
        try {
            const response = await axiosInstance.get("/api/Student/GetStudents");
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addStudent: async (data) => {
        try {
            const response = await axiosInstance.post("/api/Student/AddStudent", data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateStudent: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/api/Student/UpdateStudent/${id}`, data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteStudent: async (id) => {
        try {
            const response = await axiosInstance.post(`/api/Student/DeleteStudent/${id}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default studentsServices;
