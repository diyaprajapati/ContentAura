"use client"

import { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import api from '@/lib/api/axios'

interface ChartData {
    name: string;
    projectRequests: number;
    schemaRequests: number;
}

const chartConfig = {
    projectRequests: {
        label: "Project Requests",
        color: "hsl(var(--chart-1))",
    },
    schemaRequests: {
        label: "Schema Requests",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function Overview() {
    const [timeframe, setTimeframe] = useState('week');
    const [data, setData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: responseData } = await api.get(`/analytics/overview?timeframe=${timeframe}`);
                const chartData = responseData.map((item: any) => ({
                    name: item.time,
                    projectRequests: item.projectRequests,
                    schemaRequests: item.schemaRequests,
                }));
                setData(chartData);
            } catch (err) {
                setError('Failed to load analytics data. Please check your authentication.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeframe]);

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <Card className="border-none">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>API Requests Overview</CardTitle>
                        <CardDescription>Request analytics over time</CardDescription>
                    </div>
                    <Select
                        value={timeframe}
                        onValueChange={(value) => setTimeframe(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Last 7 days</SelectItem>
                            <SelectItem value="month">Last 30 days</SelectItem>
                            <SelectItem value="year">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="h-[400px] w-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={data}
                            className="h-[400px]"
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            {/* <Bar
                                dataKey="projectRequests"
                                fill="var(--color-projectRequests)"
                                radius={4}
                            /> */}
                            <Bar
                                dataKey="schemaRequests"
                                fill="var(--color-schemaRequests)"
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    API usage trending up <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing API requests distribution over time
                </div>
            </CardFooter>
        </Card>
    );
}