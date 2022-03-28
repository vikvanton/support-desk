import axios from "axios";

const API_URL_REIGISTER = "/api/users";
const API_URL_LOGIN = "/api/users/login";

const register = async (userData) => {
    const response = await axios.post(API_URL_REIGISTER, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL_LOGIN, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => localStorage.removeItem("user");

const authService = {
    register,
    login,
    logout,
};

export default authService;
