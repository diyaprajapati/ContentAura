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
