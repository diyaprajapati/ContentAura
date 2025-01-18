// import React from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { EditNameDialog } from "./EditNameDialog";

// edit and delete dropdown
export default function DropDownField() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal className="text-gray-500  cursor-pointer hover:text-white transition-all" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <EditNameDialog>
                            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>Edit name</DropdownMenuItem>
                        </EditNameDialog>
                        <DropdownMenuItem className="cursor-pointer">Delete field</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
