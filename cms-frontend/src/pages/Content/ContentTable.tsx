"use client"
import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ContentResponse } from "@/lib/types/content";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ContentDialog } from "./ContentDialog";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
};

// Helper function to format content for display
const formatContent = (value: any): string => {
    if (value === null || value === undefined) return '';

    if (typeof value === 'string') return value;

    if (Array.isArray(value)) {
        return value.map((item, index) => `${index + 1}. ${JSON.stringify(item)}`).join('\n');
    }

    if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
    }

    return String(value);
};

// Helper function to format different data types
const formatCellContent = (value: any): { displayText: string; fullText: string; needsTruncation: boolean } => {
    if (value === null || value === undefined) {
        return { displayText: '', fullText: '', needsTruncation: false };
    }

    const fullText = formatContent(value);
    return {
        displayText: truncateText(fullText),
        fullText,
        needsTruncation: fullText.length > 50
    };
};

interface ContentTableProps {
    contentData: ContentResponse[];
    onEdit: (content: ContentResponse) => void;
    onDelete: (contentId: number) => void;
    editingContentId?: number | null;
}

export function ContentTable({ contentData, onEdit, onDelete }: ContentTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [dialogContent, setDialogContent] = React.useState<{ isOpen: boolean; title: string; content: string }>({
        isOpen: false,
        title: '',
        content: ''
    });

    // Get all possible schema fields from all data items
    const getAllSchemaFields = React.useMemo(() => {
        const allFields = new Set<string>();

        contentData.forEach(item => {
            if (item.data && item.data.data) {
                Object.keys(item.data.data).forEach(key => {
                    allFields.add(key);
                });
            }
        });

        return Array.from(allFields);
    }, [contentData]);

    const handleContentClick = (title: string, content: string) => {
        setDialogContent({
            isOpen: true,
            title,
            content
        });
    };

    const dynamicColumns: ColumnDef<ContentResponse>[] = React.useMemo(() =>
        getAllSchemaFields.map((key) => ({
            //@ts-ignore
            accessorFn: (row) => row.data?.data?.[key] ?? null,
            id: key,
            header: key,
            cell: ({ row }) => {
                //@ts-ignore
                const value = row.original.data?.data?.[key];
                const { displayText, fullText, needsTruncation } = formatCellContent(value);

                return needsTruncation ? (
                    <button
                        onClick={() => handleContentClick(key, fullText)}
                        className="text-gray-200 hover:text-violet-400 text-left cursor-pointer"
                    >
                        {displayText}
                    </button>
                ) : (
                    <span className="text-gray-200">{displayText}</span>
                );
            },
        })),
        [getAllSchemaFields]);

    const columns: ColumnDef<ContentResponse>[] = [
        ...dynamicColumns,
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleTimeString(),
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleTimeString(),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const content = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEdit(content)}>
                                Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete(content.id)} className="bg-red-600 hover:bg-red-900">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: contentData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
    });

    return (
        <div className="w-full">
            <div className="glass-panel rounded-xl overflow-hidden mb-8">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-muted/5">
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <ContentDialog
                isOpen={dialogContent.isOpen}
                onClose={() => setDialogContent(prev => ({ ...prev, isOpen: false }))}
                title={dialogContent.title}
                content={dialogContent.content}
            />
        </div>
    );
}