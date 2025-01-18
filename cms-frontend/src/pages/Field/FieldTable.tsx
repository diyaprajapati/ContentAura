import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"


export type FieldColumn = {
    name: string;
    type: string;
}

export function FieldTable({ fields }: { fields: FieldColumn[] }) {
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
                            <MoreHorizontal />
                        </div>
                    </TableRow>
                )) : (
                    // if there is not field
                    <TableRow>
                        <TableCell colSpan={2} className="text-center">No fields found</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
