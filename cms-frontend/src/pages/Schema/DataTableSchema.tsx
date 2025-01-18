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
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

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
import { EditSchemaDialog } from "./EditSchemaDialog"
import { SchemaRequestData } from "@/lib/types/schema"

// schema column
export type SchemaColumn = {
    id: string;
    fields: number;
    name: string;
    lastUpdated: string;
}

// data table props
type DataTableSchemaProps = {
    data: SchemaColumn[];
    onDelete: (id: string) => Promise<void>;
    schemaId: number;
    currentName: string;
    onUpdate: (schemaId: number, updatedData: SchemaRequestData) => Promise<void>;
};

export function DataTableSchema({
    data,
    onDelete,
    onUpdate
}: DataTableSchemaProps) {
    const navigate = useNavigate();
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    // columns
    const columns = React.useMemo<ColumnDef<SchemaColumn>[]>(() => [
        {
            // name
            accessorKey: "name",
            header: ({ column }) => (
                <div className="flex-1">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="text-left"
                    >
                        Name
                        {/* for sorting */}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            ),
            cell: ({ row }) => (
                <div
                    className="text-left pl-4 cursor-pointer hover:underline hover:text-blue-400"
                    onClick={() => navigate(`/fields/${row.original.id}`)}
                >
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            id: "spacer",
            enableHiding: false,
            header: () => null,
            cell: () => <div className="flex-1" />,
        },
        // fields
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
        // actions like edit and delete
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {/* edit dialog */}
                                <EditSchemaDialog
                                    schemaId={Number(row.original.id)}
                                    currentName={row.original.name}
                                    // onUpdate={onUpdate}
                                    onUpdate={(schemaId, updatedData) => {
                                        const fullUpdatedData = {
                                            ...updatedData,
                                            content: {
                                                properties: {}, // Add schema properties here
                                                required: true, // Or set to false if optional
                                                type: "object",
                                            },
                                        };
                                        onUpdate(schemaId, fullUpdatedData);
                                    }}
                                >
                                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                        <Pencil className="mr-2 h-4 w-4" />  Edit Name
                                    </DropdownMenuItem>
                                </EditSchemaDialog>
                                {/* alert box before delete */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-400 hover:!text-red-600 cursor-pointer">
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete schema
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                schema and all its data.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-600 hover:bg-red-800" onClick={() => onDelete(row.original.id)}>
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ], [navigate, onDelete, onUpdate])

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
                {/* search the schema name */}
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