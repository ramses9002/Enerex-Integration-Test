// src/utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Función genérica para mostrar toast
export const showToast = (message, type = "success", duration = 5000) => {
    const options = {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    };

    switch (type) {
        case "error":
            toast.error(message, options);
            break;
        case "info":
            toast.info(message, options);
            break;
        case "warning":
            toast.warn(message, options);
            break;
        default:
            toast.success(message, options);
    }
};
