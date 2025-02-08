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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// export type Content = {
//     id: number;
//     schemaId: string;
//     data: {
//         id: number;
//         data: Record<string, any>; // Nested dynamic data
//         createdAt: string | null;
//     };
//     createdAt: string;
//     updatedAt: string;
// };

interface ContentTableProps {
    contentData: ContentResponse[]; // Pass content data dynamically
    onEdit: (content: ContentResponse) => void; // Function to handle editing
    onDelete: (contentId: number) => void; // Function to handle deletion
    editingContentId?: number | null;
}

export function ContentTable({ contentData, onEdit, onDelete }: ContentTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Extract the schema from the nested `data.data` object
    const schema = contentData.length > 0 ? Object.keys(contentData[0].data.data) : [];

    // Generate columns dynamically based on the schema
    const dynamicColumns: ColumnDef<ContentResponse>[] = schema.map((key) => ({
        accessorKey: `data.data.${key}`, // Access nested data
        header: key,
        cell: ({ row }) => {
            //@ts-ignore
            const value = row.original.data.data[key];
            return (
                <span className="text-gray-200">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
            );
        },
    }));

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
                            {/* Delete */}
                            <AlertDialog >
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}> Delete</DropdownMenuItem>
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

// "use client"
// import * as React from "react";
// import {
//     ColumnDef,
//     ColumnFiltersState,
//     SortingState,
//     VisibilityState,
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { ContentResponse } from "@/lib/types/content";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { SchemaData } from "@/lib/types/schema";
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import DynamicForm from "./DynamicForm";

// // export type Content = {
// //     id: number;
// //     schemaId: string;
// //     data: {
// //         id: number;
// //         data: Record<string, any>; // Nested dynamic data
// //         createdAt: string | null;
// //     };
// //     createdAt: string;
// //     updatedAt: string;
// // };

// interface ContentTableProps {
//     contentData: ContentResponse[]; // Pass content data dynamically
//     onEdit: (content: ContentResponse) => void; // Function to handle editing
//     onDelete: (contentId: number) => void; // Function to handle deletion
//     schemaId: string;
//     schema?: SchemaData;
// }

// export function ContentTable({ contentData, onEdit, onDelete, schemaId, schema }: ContentTableProps) {
//     const [sorting, setSorting] = React.useState<SortingState>([]);
//     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
//     const [rowSelection, setRowSelection] = React.useState({});
//     const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
//     const [selectedContent, setSelectedContent] = React.useState<ContentResponse | null>(null);

//     // Extract the schema from the nested `data.data` object
//     const schemaFields = contentData.length > 0 ? Object.keys(contentData[0].data) : [];

//     const handleEdit = (content: ContentResponse) => {
//         setSelectedContent(content);
//         setIsEditSheetOpen(true);
//     };

//     const handleFormSubmit = (updatedContent: ContentResponse) => {
//         onEdit(updatedContent);
//         setIsEditSheetOpen(false);
//         setSelectedContent(null);
//     };

//     const handleCancel = () => {
//         setIsEditSheetOpen(false);
//         setSelectedContent(null);
//     };

//     // Generate columns dynamically based on the schema
//     const dynamicColumns: ColumnDef<ContentResponse>[] = schemaFields.map((key) => ({
//         accessorKey: `data.data.${key}`, // Access nested data
//         header: key,
//         cell: ({ row }) => {
//             //@ts-ignore
//             const value = row.original.data.data[key];
//             return (
//                 <span className="text-gray-200">
//                     {typeof value === 'object' ? JSON.stringify(value) : String(value)}
//                 </span>
//             );
//         },
//     }));

//     const columns: ColumnDef<ContentResponse>[] = [
//         ...dynamicColumns,
//         {
//             accessorKey: "createdAt",
//             header: "Created At",
//             cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleTimeString(),
//         },
//         {
//             accessorKey: "updatedAt",
//             header: "Updated At",
//             cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleTimeString(),
//         },
//         {
//             id: "actions",
//             cell: ({ row }) => {
//                 const content = row.original;

//                 return (
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                                 <span className="sr-only">Open menu</span>
//                                 <MoreHorizontal />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             <DropdownMenuItem onClick={() => onEdit(content)}>
//                                 Edit
//                             </DropdownMenuItem>
//                             {/* Delete */}
//                             <AlertDialog >
//                                 <AlertDialogTrigger asChild>
//                                     <DropdownMenuItem onSelect={(e) => e.preventDefault()}> Delete</DropdownMenuItem>
//                                 </AlertDialogTrigger>
//                                 <AlertDialogContent>
//                                     <AlertDialogHeader>
//                                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                                         <AlertDialogDescription>
//                                             This action cannot be undone. This will permanently delete your data from our servers.
//                                         </AlertDialogDescription>
//                                     </AlertDialogHeader>
//                                     <AlertDialogFooter>
//                                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                         <AlertDialogAction onClick={() => onDelete(content.id)} className="bg-red-600 hover:bg-red-900">Delete</AlertDialogAction>
//                                     </AlertDialogFooter>
//                                 </AlertDialogContent>
//                             </AlertDialog>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 );
//             },
//         },
//     ];

//     const table = useReactTable({
//         data: contentData,
//         columns,
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             sorting,
//             columnFilters,
//             columnVisibility,
//             rowSelection,
//         },
//     });

//     return (
//         <div className="w-full">
//             <div className="rounded-md border">
//                 <Table>
//                     <TableHeader>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <TableRow key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => (
//                                     <TableHead key={header.id}>
//                                         {header.isPlaceholder
//                                             ? null
//                                             : flexRender(
//                                                 header.column.columnDef.header,
//                                                 header.getContext()
//                                             )}
//                                     </TableHead>
//                                 ))}
//                             </TableRow>
//                         ))}
//                     </TableHeader>
//                     <TableBody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     data-state={row.getIsSelected() && "selected"}
//                                 >
//                                     {row.getVisibleCells().map((cell) => (
//                                         <TableCell key={cell.id}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext()
//                                             )}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                                     No results.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//             <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
//                 <SheetContent className="sm:max-w-[640px] overflow-y-auto">
//                     <SheetHeader>
//                         <SheetTitle>Edit Content</SheetTitle>
//                         <SheetDescription>
//                             Make changes to your content here. Click save when you're done.
//                         </SheetDescription>
//                     </SheetHeader>
//                     {selectedContent && (
//                         <DynamicForm
//                             schema={schema}
//                             schemaId={schemaId}
//                             initialValues={selectedContent.data}
//                             onSubmit={handleFormSubmit}
//                             onCancel={handleCancel}
//                         />
//                     )}
//                 </SheetContent>
//             </Sheet>
//         </div>
//     );
// }