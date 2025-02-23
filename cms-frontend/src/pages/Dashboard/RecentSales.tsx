import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, AlertCircle } from "lucide-react";
import { ApiRequest } from '@/lib/types/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import api from '@/lib/api/axios';

export function RecentSales() {
    const [requests, setRequests] = useState<ApiRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/analytics/recent');
                setRequests(data);
            } catch (err) {
                setError('Failed to load recent requests. Please check your authentication.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent API Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <Card className='border-none'>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Recent API Requests
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {requests.map((request) => (
                        <div key={request.id} className="flex items-center">
                            <div className="ml-4 space-y-1 flex-1">
                                <p className="text-sm font-medium leading-none">
                                    Project {request.projectId}
                                    {request.schemaId && ` / Schema ${request.schemaId}`}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {request.endpoint}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(request.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${request.statusCode < 400 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {request.statusCode}
                                </span>
                                <span className="text-sm font-medium">{request.requestMethod}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}