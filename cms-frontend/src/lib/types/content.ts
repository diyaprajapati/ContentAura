export interface ContentField {
    name: string;
    type: 'string' | 'integer' | 'boolean' | 'array'; 
  }
  
  export interface ContentData {
    [key: string]: string | number | boolean | string[];
  }
  
  export interface ContentRequest {
    schemaId: number; 
    data: ContentData;
  }
  
  export interface ContentResponse {
    id: number; 
    schemaId: number; 
    data: ContentData;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiResponse<T = any> {
    status: number; 
    data: T; 
    message?: string;
  }
  