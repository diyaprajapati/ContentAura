import axios, { AxiosResponse } from "axios";
import { ContentData, ContentRequest } from "../types/content";
import { getAuthToken } from "../utils";

export const getAllContentBySchemaId = async (schemaId: string): Promise<AxiosResponse<ContentData[]>> => {
    const token = getAuthToken();
    try {
        const response = await axios.get<ContentData[]>(`${import.meta.env.VITE_API_BASE_URL}/content/${schemaId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching schemas:', error);
        throw error;
    }
};

export const createContent = async (schemaId: string, key: string): Promise<AxiosResponse<ContentData[]>> => {
    const token = getAuthToken();
    try {
        const response = await axios.post<ContentData[]>(`${import.meta.env.VITE_API_BASE_URL}/content/${schemaId}`, {
            key: key
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response;
    } catch (error) {
        console.error('Error fetching schemas:', error);
        throw error;
    }
};

export const updateContent = async (id: string, contentData: ContentRequest): Promise<AxiosResponse<ContentData>> => {
    const token = getAuthToken();
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/content/${id}`, contentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error updating schema:', error);
        throw error;
    }
}

export const deleteContent = async (id: number): Promise<AxiosResponse<ContentData>> => {
    const token = getAuthToken();
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/content/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error updating schema:', error);
        throw error;
    }
}