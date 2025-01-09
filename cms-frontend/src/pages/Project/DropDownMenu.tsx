import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";


export default function DropDownMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="hover:bg-white/20 rounded-full p-1 transition-all">
                    <EllipsisVertical className="focus:bg-white/20 cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                        <Pencil />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:!text-red-500 transition-all cursor-pointer">
                        <Trash2 />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
