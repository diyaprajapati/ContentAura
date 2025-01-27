import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil } from "lucide-react";
import { EditNameDialog } from "./EditNameDialog";

type DropDownFieldProps = {
    schemaId: number;
    currentTitle: string;
    onDelete: (schemaId: number) => void;
    onUpdate: (schemaId: number, updatedData: { title: string }) => void;
}

// edit and delete dropdown
export default function DropDownField({ schemaId, currentTitle, onUpdate }: DropDownFieldProps) {
    // export default function DropDownField() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal className="text-gray-500  cursor-pointer hover:text-white transition-all" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <EditNameDialog
                            schemaId={schemaId}
                            currentTitle={currentTitle}
                            onUpdate={onUpdate}>
                            {/* <EditNameDialog> */}
                            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                <Pencil />
                                Edit name
                            </DropdownMenuItem>
                        </EditNameDialog>
                        <DropdownMenuItem className="cursor-pointer">Delete field</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
