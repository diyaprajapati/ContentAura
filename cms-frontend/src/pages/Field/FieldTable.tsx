import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

const fields = [
    {
        name: "title",
        fieldType: "string"
    },
    {
        name: "amount",
        fieldType: "number"
    },
    {
        name: "status",
        fieldType: "boolean"
    }
]

export type FieldColumn = {
    id: string;
    name: string;
    type: string;
}

export function FieldTable() {
    return (
        <Table className="md:w-[90%] place-self-center">
            <TableHeader>
                <TableRow>
                    <TableHead className="py-4">Name</TableHead>
                    <TableHead className="text-right pr-24 md:pr-48">Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field) => (
                    <TableRow key={field.name}>
                        <TableCell className="font-medium py-4">{field.name}</TableCell>
                        <div className="flex items-center justify-end pt-2 gap-16 md:gap-40">
                            <TableCell>{field.fieldType}</TableCell>
                            <MoreHorizontal />
                        </div>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
