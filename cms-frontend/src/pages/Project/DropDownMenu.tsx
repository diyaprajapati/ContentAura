import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { AlertBox } from "./AlertBox";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

type DropDownMenuProps = {
    projectId: number;
    onDelete: (projectId: number) => void;
};

export default function DropDownMenu({ projectId, onDelete }: DropDownMenuProps) {

    const deleteProject = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: "Project deleted successfully!",
            });
            onDelete(projectId); // Update the UI
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
                    <DropdownMenuItem className="cursor-pointer">
                        <Pencil />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    {/* Delete button with alert box */}
                    <AlertBox
                        onConfirm={deleteProject}>
                        <DropdownMenuItem
                            className="text-red-400 hover:!text-red-500 transition-all cursor-pointer"
                            onSelect={(e) => e.preventDefault()}>
                            <Trash2 />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </AlertBox>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
