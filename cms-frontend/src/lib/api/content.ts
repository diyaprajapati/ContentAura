// for fields

import axios, { AxiosResponse } from "axios";
import { getAuthToken } from "../utils";

export const getFieldsBySchemaId = async (schemaId: string): Promise<AxiosResponse<any>> => {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}/fields`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching fields:', error);
        throw error;
    }
};