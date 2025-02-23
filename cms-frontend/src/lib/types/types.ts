export interface ApiRequest {
    id: number;
    requestCount: number;
    projectId: number;
    schemaId?: number;
    endpoint: string;
    statusCode: number;
    requestMethod: string;
    timestamp: string;
  }
  
  export interface OverviewDataPoint {
    time: string;
    projectRequests: number;
    schemaRequests: number;
  }