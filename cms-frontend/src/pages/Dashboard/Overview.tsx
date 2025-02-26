"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import api from "@/lib/api/axios";

const chartConfig = {
    apiUsage: {
        label: "API Requests",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function Overview() {
    const [data, setData] = useState<{ label: string; count: number }[]>([]);
    const [selectedRange, setSelectedRange] = useState<"weekly" | "monthly" | "yearly">("weekly");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get("/analytics/overview");
                const apiData = response.data;

                const formattedData = {
                    weekly: apiData.weekly.map((item: { date: string; count: number }) => ({
                        label: new Date(item.date).toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
                        count: item.count,
                    })),
                    monthly: apiData.monthly.map((item: { month: string; count: number }) => ({
                        label: item.month,
                        count: item.count,
                    })),
                    yearly: apiData.yearly.map((item: { year: string; count: number }) => ({
                        label: item.year,
                        count: item.count,
                    })),
                };
                //@ts-ignore
                setData(formattedData);
            } catch (err) {
                setError("Failed to load API overview. Please check your authentication.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className="border-none">
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>API Usage Overview</CardTitle>
                    <CardDescription>See API requests over different timeframes</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{selectedRange.toUpperCase()}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedRange("weekly")}>Weekly</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedRange("monthly")}>Monthly</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedRange("yearly")}>Yearly</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            //@ts-ignore
                            data={data[selectedRange]}
                            margin={{ left: 12, right: 12 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Line
                                dataKey="count"
                                type="natural"
                                stroke="var(--color-apiUsage)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-apiUsage)" }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Data for the selected timeframe
                </div>
                <div className="leading-none text-muted-foreground">
                    Displaying API request counts for {selectedRange}
                </div>
            </CardFooter>
        </Card>
    );
}
