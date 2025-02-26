export interface ApiRequest {
    id: number;
    projectName: string;
    schemaName?: string;
    userId?: number;  // Add this to match API response
    endpoint: string;
    statusCode: number;
    requestMethod: string;
    timestamp: string;
}
