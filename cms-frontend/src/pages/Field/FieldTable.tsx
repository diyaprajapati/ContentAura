// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import FieldsOptionsDropdown from "./FieldsOptionsDropdown";


// export type FieldColumn = {
//     name: string;
//     type: string;
// }

// export function FieldTable({ fields, onDelete, onUpdate }: { fields: FieldColumn[], onDelete: (name: string) => void, onUpdate: (oldName: string, newName: string) => void }) {
//     return (
//         <Table className="md:w-[90%] place-self-center">
//             <TableHeader>
//                 <TableRow>
//                     {/* header */}
//                     <TableHead className="py-4">Name</TableHead>
//                     <TableHead className="text-right pr-24 md:pr-48">Type</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {fields.length > 0 ? fields.map((field) => (
//                     // rows
//                     <TableRow key={field.name}>
//                         {/* name and type */}
//                         <TableCell className="font-medium py-4">{field.name}</TableCell>
//                         <div className="flex items-center justify-end pt-2 gap-16 md:gap-40">
//                             <TableCell>{field.type}</TableCell>
//                             {/* <MoreHorizontal /> */}
//                             <FieldsOptionsDropdown
//                                 schemaId={1}
//                                 fieldName={field.name}
//                                 onDelete={onDelete}
//                                 onUpdate={onUpdate}
//                             />
//                         </div>
//                     </TableRow>
//                 )) : (
//                     // if there is not field
//                     <TableRow>
//                         <TableCell colSpan={2} className="text-center">No fields found</TableCell>
//                     </TableRow>
//                 )}
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
import FieldsOptionsDropdown from "./FieldsOptionsDropdown";

export type FieldColumn = {
    id: number;
    name: string;
    type: string;
};

type FieldTableProps = {
    schemaId: number; // Dynamic schema ID
    fields: FieldColumn[];
    onDelete: (schemaId: number, fieldName: string) => void;
    onUpdate: (schemaId: number, fieldName: string, updatedData: { title: string }) => void;
};

export function FieldTable({ schemaId, fields, onDelete, onUpdate }: FieldTableProps) {
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
                {fields.length > 0 ? (
                    fields.map((field) => (
                        // rows
                        <TableRow key={field.name}>
                            {/* name and type */}
                            <TableCell className="font-medium py-4">{field.name}</TableCell>
                            <div className="flex items-center justify-end pt-2 gap-16 md:gap-40">
                                <TableCell>{field.type}</TableCell>
                                {/* Dropdown for each field */}
                                <FieldsOptionsDropdown
                                    schemaId={schemaId}
                                    fieldName={field.name}
                                    onDelete={(fieldName) => onDelete(schemaId, fieldName)}
                                    onUpdate={(oldName, newName) => onUpdate(schemaId, oldName, { title: newName })}
                                />
                            </div>
                        </TableRow>
                    ))
                ) : (
                    // if there is no field
                    <TableRow>
                        <TableCell colSpan={2} className="text-center">
                            No fields found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
