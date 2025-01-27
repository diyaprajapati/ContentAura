// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal, Pencil } from "lucide-react";
// import { EditNameDialog } from "./EditNameDialog";

// type DropDownFieldProps = {
//     schemaId: number;
//     fieldName: string;
//     onDelete: (fieldName: string) => void;
//     onUpdate: (oldName: string, newName: string) => void;
// }

// // edit and delete dropdown
// export default function DropDownField({ schemaId, onUpdate, fieldName, onDelete }: DropDownFieldProps) {

//     const handleDelete = () => {
//         if (confirm(`Are you sure you want to delete the field "${fieldName}"?`)) {
//             onDelete(fieldName);
//         }
//     };

//     return (
//         <div>
//             <DropdownMenu>
//                 <DropdownMenuTrigger>
//                     <MoreHorizontal className="text-gray-500  cursor-pointer hover:text-white transition-all" />
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                     <DropdownMenuGroup>
//                         <EditNameDialog
//                             schemaId={schemaId}
//                             currentTitle={fieldName}
//                             onUpdate={(newName) => onUpdate(fieldName, newName)}>
//                             {/* <EditNameDialog> */}
//                             <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
//                                 <Pencil />
//                                 Edit name
//                             </DropdownMenuItem>
//                         </EditNameDialog>
//                         <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>Delete field</DropdownMenuItem>
//                     </DropdownMenuGroup>
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </div>
//     )
// }

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { EditNameDialog } from "./EditNameDialog";
import { AlertDeleteField } from "./AlertDeleteField"; // Import the alert component
import { deleteSchemaField } from "@/lib/api/schema";
import { useState } from "react";

type DropDownFieldProps = {
    schemaId: number; // Dynamic schema ID
    fieldName: string; // Field name for identification
    onDelete: (fieldName: string) => void; // onDelete handler
    onUpdate: (oldName: string, newName: string) => void; // onUpdate handler
};

export default function FieldsOptionsDropdown({
    schemaId,
    fieldName,
    onDelete,
    onUpdate
}: DropDownFieldProps) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!schemaId) {
            console.error("Schema ID is undefined. Cannot delete field.");
            return;
        }

        try {
            await deleteSchemaField(schemaId, fieldName);
            onDelete(fieldName); // Update the UI
            setError(null);
        } catch (error) {
            console.error("Error deleting field:", error);
            setError("Failed to delete field. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (schemaId: number, oldName: string, newName: string) => {
        if (!schemaId) {
            console.error("Schema ID is undefined. Cannot update field name.");
            return;
        }

        try {
            onUpdate(oldName, newName); // Notify parent to update UI
            setError(null); // Clear errors
        } catch (error) {
            console.error("Error renaming field:", error);
            setError("Failed to rename field. Please try again.");
        }
    };


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal className="text-gray-500 cursor-pointer hover:text-white transition-all" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {/* Edit field name option */}
                        <EditNameDialog
                            schemaId={schemaId}
                            currentTitle={fieldName}
                            onUpdate={handleUpdate}>
                            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                <Pencil className="mr-2" />
                                Edit name
                            </DropdownMenuItem>
                        </EditNameDialog>
                        {/* Delete field option with confirmation alert */}
                        <AlertDeleteField
                            onConfirm={handleDelete} // Confirm delete action
                        >
                            <DropdownMenuItem
                                className={`cursor-pointer text-red-600 ${loading ? "opacity-50" : ""}`}
                                onSelect={(e) => e.preventDefault()}
                                disabled={loading}
                            >
                                <Trash2 className="mr-2" />
                                {loading ? "Deleting..." : "Delete field"}
                            </DropdownMenuItem>
                        </AlertDeleteField>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
