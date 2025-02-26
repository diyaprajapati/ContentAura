import { useEffect, useState } from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ChevronDown } from "lucide-react";
import { ApiRequest } from '@/lib/types/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import api from '@/lib/api/axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function RecentApis() {
    const [requests, setRequests] = useState<ApiRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await api.get('/analytics/recent', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRequests(data);
            } catch (err) {
                setError('Failed to load recent requests. Please check your authentication.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns: ColumnDef<ApiRequest>[] = [
        {
            accessorKey: "projectName",
            header: "Project",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("projectName")}</div>
            ),
        },
        {
            accessorKey: "schemaName",
            header: "Schema",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("schemaName") || "N/A"}</div>
            ),
        },
        {
            accessorKey: "endpoint",
            header: "Endpoint",
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("endpoint")}</div>
            ),
        },
        {
            accessorKey: "timestamp",
            header: "Timestamp",
            cell: ({ row }) => (
                <div>{new Date(row.getValue("timestamp")).toLocaleDateString()}</div>
            ),
        },
    ];

    const table = useReactTable({
        data: requests,
        columns,
        state: {
            columnFilters,
            columnVisibility,
        },
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (loading) {
        return (
            <Card>
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
            <CardContent>
                {/* Filter Input and Column Visibility Dropdown */}
                <div className="flex gap-5 py-4">
                    <Input
                        placeholder="Filter Projects..."
                        value={(table.getColumn("projectName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("projectName")?.setFilterValue(event.target.value)
                        }
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}