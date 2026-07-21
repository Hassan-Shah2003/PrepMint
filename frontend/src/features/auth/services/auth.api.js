import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const register = async ({username,email,password}) => {
    try {
        const response = await api.post("/register", { username, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};
export const login = async ({usernameOrEmail,password}) => {
    try {
        const response = await api.post("/login", { usernameOrEmail, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
}
export const logout = async () => {
    try {
        await api.get("/logout");
    } catch (error) {
        throw error.response?.data?.message || "Logout failed";
    }
}
export const getCurrentUser = async () => {
    try {
        const response = await api.get("/get-me");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch current user";
    }
}