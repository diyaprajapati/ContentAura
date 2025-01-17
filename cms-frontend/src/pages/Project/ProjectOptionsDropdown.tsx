import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { DeleteAlertBox } from "./DeleteAlertBox";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { EditDialog } from "./EditDialog";

type DropDownMenuProps = {
    projectId: number;
    currentTitle: string;
    currentDescription: string;
    onDelete: (projectId: number) => void;
    onUpdate: (projectId: number, updatedData: { title: string; description: string }) => void;
};

export default function DropDownMenu({ projectId, onDelete, currentDescription, currentTitle, onUpdate }: DropDownMenuProps) {

    const deleteProject = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Project deleted successfully",
                });
                onDelete(projectId); // Update the UI
            }
            // toast({
            //     title: "Project deleted successfully!",
            // });
            // onDelete(projectId); // Update the UI
        } catch (error) {
            console.error("Error deleting project:", error);
            toast({
                title: "Error deleting project!",
                description: "Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="hover:bg-white/20 rounded-full p-1 transition-all">
                    <EllipsisVertical className="focus:bg-white/20 cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    {/* Edit button */}
                    <EditDialog
                        projectId={projectId}
                        currentTitle={currentTitle}
                        currentDescription={currentDescription}
                        onUpdate={onUpdate}
                    >
                        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                            <Pencil />
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </EditDialog>


                    {/* Delete button with alert box */}
                    <DeleteAlertBox
                        onConfirm={deleteProject}>
                        <DropdownMenuItem
                            className="text-red-400 hover:!text-red-500 transition-all cursor-pointer"
                            onSelect={(e) => e.preventDefault()}>
                            <Trash2 />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DeleteAlertBox>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
