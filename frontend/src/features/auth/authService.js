import axios from "axios";

const API_URL = "/api/users/";

const signInOrUp = async (userData) => {
    const response = await axios.post(
        userData.name ? API_URL : API_URL + "login",
        userData
    );
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const signOut = () => localStorage.removeItem("user");

const authService = {
    signInOrUp,
    signOut,
};

export default authService;
