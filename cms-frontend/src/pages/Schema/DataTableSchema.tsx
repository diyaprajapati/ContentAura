"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
// import { deleteSchema } from "@/lib/api/schema"
// import { toast } from "@/hooks/use-toast"

export type SchemaColumn = {
    id: string;
    fields: number;
    name: string;
    lastUpdated: string;
}

type DataTableSchemaProps = {
    data: SchemaColumn[];
    onDelete: (id: string) => Promise<void>;
};

// const handleDelete = async (id: string, onDelete: () => void) => {
//     try {
//         const response = await deleteSchema(Number(id));
//         if (response.status === 200) {
//             toast({
//                 title: "Schema Deleted Successfully!"
//             });
//             onDelete();
//         }
//     } catch (error) {
//         toast({
//             title: "Error deleting schema"
//         })
//     }
// }

export const createColumns = (onDelete: (id: string) => Promise<void>): ColumnDef<SchemaColumn>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <div className="flex-1">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-left"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => {
            const navigate = useNavigate();
            const handleNameClick = () => {
                navigate(`/fields/${row.getValue("id")}`);
            };

            return (
                <div className="text-left pl-4 cursor-pointer hover:underline hover:text-blue-400" onClick={handleNameClick}>
                    {row.getValue("name")}
                </div>
            );
        },
    },
    {
        id: "spacer",
        enableHiding: false,
        header: () => null,
        cell: () => <div className="flex-1" />,
    },
    {
        accessorKey: "fields",
        header: () => <div className="text-right whitespace-nowrap">Fields</div>,
        cell: ({ row }) => {
            const fields = parseInt(row.getValue("fields"))
            return <div className="text-right font-medium pr-4">{fields}</div>
        },
    },
    {
        accessorKey: "lastUpdated",
        header: () => <div className="text-right whitespace-nowrap">Last Updated</div>,
        cell: ({ row }) => (
            <div className="text-right font-medium">{row.getValue("lastUpdated")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div></div>,
        cell: ({ row }) => {
            return (
                <div className="flex justify-end">
                    {/* dropdown for delete and edit */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Name</DropdownMenuItem>
                            {/* to delete the schema */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete schema</DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-800" onClick={() => onDelete(row.original.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]


export function DataTableSchema({ data, onDelete }: DataTableSchemaProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const columns = React.useMemo(() => createColumns(onDelete), [onDelete]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search schema type..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}