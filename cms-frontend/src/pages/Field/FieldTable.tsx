import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react";
import { AlertDeleteField } from "./AlertDeleteField";

export type FieldColumn = {
    name: string;
    type: string;
}

interface FieldTableProps {
    fields: FieldColumn[];
    onDeleteField: (fieldName: string) => void;
}

export function FieldTable({ fields, onDeleteField }: FieldTableProps) {
    return (
        <Table className="md:w-[90%] place-self-center">
            <TableHeader>
                <TableRow>
                    {/* header */}
                    <TableHead className="py-4">Name</TableHead>
                    <TableHead className="text-right pr-24 md:pr-48">Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.length > 0 ? fields.map((field) => (
                    // rows
                    <TableRow key={field.name}>
                        {/* name and type */}
                        <TableCell className="font-medium py-4">{field.name}</TableCell>
                        <div className="flex items-center justify-end pt-2 gap-16 md:gap-40">
                            <TableCell>{field.type}</TableCell>
                            {/* <MoreHorizontal /> */}
                            <AlertDeleteField
                                onConfirm={() => onDeleteField(field.name)}
                            >
                                <div className="cursor-pointer p-2 hover:bg-red-100/10 rounded-full transition-colors">
                                    <Trash2 className="h-5 text-red-500" />
                                </div>
                            </AlertDeleteField>
                        </div>
                    </TableRow>
                )) : (
                    // if there is not field
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50">
                                    <path d="M5 8h14M5 12h14M5 16h10"></path>
                                </svg>
                                <p>No fields added yet</p>
                                <p className="text-sm">Add fields to see them here</p>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}