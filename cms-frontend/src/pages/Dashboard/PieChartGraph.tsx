"use client"

import * as React from "react";
import { ChartPie } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";


export function PieChartGraph() {
    // const [chartData, setChartData] = React.useState([]);
    const [chartData, setChartData] = React.useState<{
        projectTitle: string;
        schemaCount: number;
        fill: string;
    }[]>([]);

    const [totalProjects, setTotalProjects] = React.useState(0);


    React.useEffect(() => {
        const fetchChartData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                // Fetch total projects count
                const projectCountRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/count`, { headers });
                const totalProjects = projectCountRes.data;
                setTotalProjects(totalProjects);

                // Fetch all projects
                const projectsRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`, { headers });
                const projects = projectsRes.data;

                let schemaData = [];
                let totalSchemasCount = 0;

                // Fetch schema count for each project
                for (const project of projects) {
                    const schemaRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/schema/count/${project.id}`, { headers });
                    const schemaCount = schemaRes.data.schemaCount;

                    schemaData.push({
                        projectTitle: project.title,
                        schemaCount,
                        fill: `hsl(var(--chart-${(schemaData.length % 5) + 1}))`,
                    });

                    totalSchemasCount += schemaCount;
                }

                setChartData(schemaData);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0 flex flex-row justify-between">
                <div>
                    <CardTitle>Schema Distribution per Project</CardTitle>
                    <CardDescription>Latest Schema Counts</CardDescription>
                </div>
                <div className="text-gray-400 w-4 place-items-center">
                    <ChartPie className="w-5" />
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={{}}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="schemaCount"
                            nameKey="projectTitle"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalProjects.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Projects
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    Showing total schema counts per project
                </div>
            </CardFooter>
        </Card>
    );
}
