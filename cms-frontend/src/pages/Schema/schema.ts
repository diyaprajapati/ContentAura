import axios from "axios";

// Fetch schemas by project ID
export const getSchemasByProjectId = async (projectId: number) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/schema/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching schemas", error);
    throw error;
  }
};

// Create a new schema
export const createSchema = async (projectId: number, schemaData: { name: string; content: any }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/schema/${projectId}`, schemaData);
    return response.data;
  } catch (error) {
    console.error("Error creating schema", error);
    throw error;
  }
};

// Update an existing schema
export const updateSchema = async (schemaId: number, schemaData: { name: string; content: any }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}`, schemaData);
    return response.data;
  } catch (error) {
    console.error("Error updating schema", error);
    throw error;
  }
};

// Delete a schema
export const deleteSchema = async (schemaId: number) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}`);
  } catch (error) {
    console.error("Error deleting schema", error);
    throw error;
  }
};
