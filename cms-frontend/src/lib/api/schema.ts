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

// export const createSchema = async (projectId: string, data: { name: string, content: string }): Promise<AxiosResponse<SchemaData>> => {
//     const token = getAuthToken();
//     try {
//         const response = await axios.post<SchemaData>(`${import.meta.env.VITE_API_BASE_URL}/schema/${projectId}`, data,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//         return response;
//     } catch (error) {
//         console.error('Error creating schema:', error);
//         throw error;
//     }
// };

export const createSchema = async (projectId: string, schemaData: { name: string, content: { foo: number, bar: string } }): Promise<AxiosResponse<SchemaData>> => {
    const token = getAuthToken();
    try {
        const response = await axios.post<SchemaData>(
            `${import.meta.env.VITE_API_BASE_URL}/schema/${projectId}`, 
            {
                name: schemaData.name,
                content: schemaData.content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error creating schema:', error);
        throw error;
    }
};


// export const updateSchema = async (id: number, data: { name: string, content: string }): Promise<AxiosResponse<SchemaData>> => {
//     const token = getAuthToken();
//     try {
//         const response = await axios.put<SchemaData>(`${import.meta.env.VITE_API_BASE_URL}/schema/${id}`, data,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//         return response;
//     } catch (error) {
//         console.error('Error updating schema:', error);
//         throw error;
//     }
// };

export const updateSchema = async (id: number, schemaData: { name: string, content: { foo: number, bar: string } }): Promise<AxiosResponse<SchemaData>> => {
    const token = getAuthToken();
    try {
        const response = await axios.put<SchemaData>(
            `${import.meta.env.VITE_API_BASE_URL}/schema/${id}`, 
            {
                name: schemaData.name,
                content: schemaData.content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating schema:', error);
        throw error;
    }
};


export const deleteSchema = async (id: number): Promise<AxiosResponse<void>> => {
    const token = getAuthToken();
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/schema/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response;
    } catch (error) {
        console.error('Error deleting schema:', error);
        throw error;
    }
};

// create field
export const createField = async (schemaId: string, fieldData: { name: string, type: string }): Promise<AxiosResponse> => {
    const token = getAuthToken();
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}/fields`,
            fieldData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error creating field:', error);
        throw error;
    }
};

export const getFieldsBySchemaId = async (schemaId: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/schema/fields/${schemaId}`);
        return response;
    } catch (error) {
        console.error('Error fetching fields by schema ID:', error);
        throw error;
    }
};