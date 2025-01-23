// export interface ContentField {
//     name: string;
//     type: 'string' | 'integer' | 'boolean' | 'array'; 
//   }
  
//   export interface ContentData {
//     [key: string]: string | number | boolean | string[];
//   }
  
//   export interface ContentRequest {
//     schemaId: number; 
//     data: ContentData;
//   }
  
//   export interface ContentResponse {
//     id: number; 
//     schemaId: number; 
//     data: ContentData;
//     createdAt: string;
//     updatedAt: string;
//   }
  
//   export interface ApiResponse<T = any> {
//     status: number; 
//     data: T; 
//     message?: string;
//   }
  
export enum ContentType {
    STRING = "string",
    INTEGER = "integer",
    BOOLEAN = "boolean",
    ARRAY = "array",
  }
  
  export interface ContentField {
    name: string;
    type: ContentType;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  }
  
  export interface ContentData {
    [key: string]: string | number | boolean | string[] | ContentData;
  }
  
  export interface ContentRequest {
    schemaId: number;
    data: ContentData;
    metadata?: {
      userId?: number;
      source?: string;
    };
  }
  
  export interface ContentResponse {
    id: number;
    schemaId: number;
    data: ContentData;
    createdAt: string; // ISO 8601 format or Date
    updatedAt: string; // ISO 8601 format or Date
  }
  
  export interface ApiResponse<T = any> {
    status: number;
    data: T;
    message?: string;
  }
  