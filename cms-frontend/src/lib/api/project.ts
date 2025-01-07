import axios from "axios";
import { getAuthToken } from "../utils"

export const getAllProjects = async() => {
    const token = getAuthToken();

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`, {
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