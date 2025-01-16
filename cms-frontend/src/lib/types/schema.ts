export interface SchemaData {
    id: number;
    name: string;
    content: object;
    projectId: number;
    createdAt: string;
}

export interface ApiResponse<T = any> {
    status: number;
    data: T;
    message?: string;
}