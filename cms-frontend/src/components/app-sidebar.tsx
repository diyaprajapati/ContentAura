import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from "lucide-react"

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
import { Button } from "./ui/button"

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
        icon: Inbox,
    },
    {
        title: "Api Keys",
        url: "#",
        icon: Calendar,
        // icons change krvana cheeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    },
    {
        title: "Schemas",
        url: "#",
        icon: Search,
    },
    {
        title: "Content",
        url: "#",
        icon: Settings,
    },
    {
        title: "Analytics",
        url: "#",
        icon: Settings,
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
                                <DropdownMenuItem>
                                    <span className="py-2">Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button onClick={handleLogout} className='bg-transparent hover:bg-transparent p-[-2] py-[-4] font-normal text-sm'>Logout </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuSubItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
