import { SchemaData } from '../types/schema';
import axios, { AxiosResponse } from 'axios';
import { getAuthToken } from '../utils';

export const getAllSchemasByProjectId = async (projectId: string): Promise<AxiosResponse<SchemaData[]>> => {
    const token = getAuthToken();
    try {

        const response = await axios.get<SchemaData[]>(`${import.meta.env.VITE_API_BASE_URL}/schema/${projectId}`, {
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

export const createSchema = async (projectId: string, data: { name: string, content: string }): Promise<AxiosResponse<SchemaData>> => {
    try {
        const response = await axios.post<SchemaData>(`${import.meta.env.VITE_API_BASE_URL}/schema/${projectId}`, data);
        return response;
    } catch (error) {
        console.error('Error creating schema:', error);
        throw error;
    }
};

export const updateSchema = async (id: number, data: { name: string, content: string }): Promise<AxiosResponse<SchemaData>> => {
    try {
        const response = await axios.put<SchemaData>(`${import.meta.env.VITE_API_BASE_URL}/schema/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating schema:', error);
        throw error;
    }
};

export const deleteSchema = async (id: number): Promise<AxiosResponse<void>> => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/schema/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting schema:', error);
        throw error;
    }
};
