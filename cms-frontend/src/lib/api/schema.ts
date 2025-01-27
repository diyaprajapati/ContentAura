import { SchemaData, SchemaRequestData } from '../types/schema';
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

export const createSchema = async (projectId: string, name: string): Promise<AxiosResponse<SchemaData>> => {
  const token = getAuthToken();
  try {
    const response = await axios.post<SchemaData>(
      `${import.meta.env.VITE_API_BASE_URL}/schema/${projectId}`,
      {
        name: name,
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

export const updateSchema = async (id: string, schemaData: SchemaRequestData): Promise<AxiosResponse<SchemaData>> => {
  const token = getAuthToken();
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/schema/${id}`,
      schemaData,
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
export const createField = async (schemaId: string, data: SchemaRequestData): Promise<AxiosResponse> => {
  const token = getAuthToken();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}`,
      data,
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
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/schema/byId/${schemaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error fetching fields by schema ID:', error);
    throw error;
  }
};

export const deleteSchemaField = async (schemaId: number, fieldName: string): Promise<void> => {
  const token = getAuthToken();
  await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}/property/${fieldName}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
};

// export const renameSchemaField = async (schemaId: number, oldName: string, newName: string): Promise<void> => {
//   const token = getAuthToken();
//   const response = await axios.put(
//       `${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}/property/rename`,
//       { oldName, newName },
//       {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       }
//   );
//   return response;
// };

export async function renameSchemaField(schemaId: number, oldName: string, newName: string) {
  const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}/property/rename`, {
      oldName,
      newName
  });
  return response.data;
}
