// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { MoreHorizontal } from "lucide-react"

// const fields = [
//     {
//         name: "title",
//         fieldType: "string"
//     },
//     {
//         name: "amount",
//         fieldType: "number"
//     },
// ]

// export function FieldTable() {
//     return (
//         <Table className="">
//             <TableHeader className="flex justify-between">
//                 <TableRow className="flex">
//                     <TableHead className="">Name</TableHead>
//                     <TableHead>Type</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody className="">
//                 {fields.map((field) => (
//                     <TableRow key={field.name} className="items-center">
//                         <TableCell className="font-medium">{field.name}</TableCell>
//                         <TableCell>{field.fieldType}</TableCell>
//                         <MoreHorizontal className="items-center" />
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     )
// }

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import FieldsOptionsDropdown from './FieldsOptionsDropdown'

const fields = [
    {
        name: "title",
        fieldType: "string",
    },
    {
        name: "amount",
        fieldType: "number",
    },
];

export function FieldTable() {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left px-4 py-2">Name</TableHead>
                    <TableHead className="text-center px-4 py-2">Type</TableHead>
                    <TableHead className="w-10 text-center"></TableHead> {/* Empty for the icon */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field) => (
                    <TableRow
                        key={field.name}>
                        <TableCell className="px-4 py-3 font-medium">
                            {field.name}
                        </TableCell>
                        <TableCell className="text-center px-4 py-2">{field.fieldType}</TableCell>
                        <TableCell className="text-center ">
                            <FieldsOptionsDropdown />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
