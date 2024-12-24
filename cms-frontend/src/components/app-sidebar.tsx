import {
    ChevronUp,
    Home,
    User2,
    Folder,
    Key,
    Database,
    FileText,
    BarChart,
    LogOut,
    Settings
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Projects",
        url: "#",
        icon: Folder,
    },
    {
        title: "Api Keys",
        url: "#",
        icon: Key,
    },
    {
        title: "Schemas",
        url: "#",
        icon: Database,
    },
    {
        title: "Content",
        url: "#",
        icon: FileText,
    },
    {
        title: "Analytics",
        url: "#",
        icon: BarChart,
    },
]

export function AppSidebar() {

    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/auth');
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    {/* title */}
                    <SidebarGroupLabel>ContentAura</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {/* sidebar items */}
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuSubItem>
                        {/* dropdown menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem className="flex justify-between">
                                    <span>Account</span>
                                    <Settings />
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="flex justify-between">
                                    <span>Logout</span>
                                    <LogOut />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuSubItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
