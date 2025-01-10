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
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Projects",
        url: "/project",
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
    const location = useLocation();
    const [firstname, setFirstname] = useState("");

    // fetch firstname from the backend
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate('/auth')
                return
            }

            try {
                const response = await fetch(`${API_URL}/api/auth/user-details`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (!response.ok) {
                    throw new Error()
                }

                const data = await response.json()
                setFirstname(data.firstname)
            } catch {
                localStorage.removeItem('token')
                navigate('/auth')
            }
        }

        fetchUserDetails()
    }, [navigate]);

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
                            {items.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a
                                                href={item.url}
                                                className={isActive ? "bg-white/20 font-semibold" : ""}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
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
                                    <User2 /> {firstname}
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
