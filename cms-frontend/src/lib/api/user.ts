import axios from "axios";
import { getAuthToken } from "../utils"
import { UserData } from "../types/user";

export const updateUserDetails = async (userData: Omit<UserData, "id">) => {
    const token = getAuthToken();

    try {
        const res = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/auth/update-profile`,
            userData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return res.data; 
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error; 
    }
};

export const getUserDetails = async () => {
    const token = getAuthToken();

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/user-details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    }
    catch(e) {
        console.log("error", e);
    }
}