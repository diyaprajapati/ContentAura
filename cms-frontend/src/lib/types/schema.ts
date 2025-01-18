export interface SchemaData {
    id: number;
    name: string;
    content: {
      properties: object;
      required: boolean;
      type: string;
    };
    projectId: number;
    createdAt: string;
    fields?: {
      id: number;
      name: string;
      type: string;
  }[]; // Add fields array
}

export interface SchemaRequestData {
  name: string;
  content: {
    properties: object;
    required: boolean;
    type: string;
  }
}

export interface ApiResponse<T = any> {
    status: number;
    data: T;
    message?: string;
}
