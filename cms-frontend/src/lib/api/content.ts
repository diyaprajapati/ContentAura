import axios, { AxiosResponse } from "axios";
import { ContentData } from "../types/content";
import { getAuthToken } from "../utils";

// Fetch all content for a schema
export const getAllContentBySchemaId = async (
    schemaId: string
  ): Promise<AxiosResponse<ContentData[]>> => {
    const token = getAuthToken();
  
    const response = await axios.get<ContentData[]>(
      `${import.meta.env.VITE_API_BASE_URL}/content/${schemaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response;
  };

// Create new content for a schema
export const createContent = async (
    schemaId: string,
    contentData: { data: Record<string, any> }
  ) => {
    const token = getAuthToken();
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/content/${schemaId}`,
      contentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

// Update existing content
export const updateContent = async (
    contentId: string,
    contentData: { data: Record<string, any> }
  ): Promise<AxiosResponse<ContentData>> => {
    const token = getAuthToken();
  
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/content/${contentId}`,
      contentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response;
  };

// Delete content by ID
export const deleteContent = async (
    contentId: number
  ): Promise<AxiosResponse<ContentData>> => {
    const token = getAuthToken();
  
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/content/${contentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response;
  };