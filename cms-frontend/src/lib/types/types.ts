export interface ApiRequest {
    id: number;
    projectId: number;
    schemaId?: number;
    userId?: number;  // Add this to match API response
    endpoint: string;
    statusCode: number;
    requestMethod: string;
    timestamp: string;
}
