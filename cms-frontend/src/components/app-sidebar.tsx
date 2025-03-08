import {
    ChevronUp,
    Home,
    User2,
    Folder,
    Key,
    Database,
    FileText,
    LogOut,
    Settings,
    File,
    Workflow
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
        title: "Documentation",
        url: "/documentation",
        icon: File,
    },
    {
        title: "Projects",
        url: "/project",
        icon: Folder,
    },
    {
        title: "Schemas",
        url: "/schema",
        icon: Database,
    },
    {
        title: "Content",
        url: "/content",
        icon: FileText,
    },
    {
        title: "Api Keys",
        url: "/api",
        icon: Key,
    },
    {
        title: "Flow chart",
        url: "/flowchart",
        icon: Workflow,
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
        localStorage.removeItem('selectedProject');
        localStorage.removeItem('selectedSchemas');
        navigate('/auth');
    }

    function handleSettings() {
        navigate('/settings');
    }

    return (
        <Sidebar>
            <SidebarContent className="bg-violet-950/10">
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
                                                className={`border font-semibold ${isActive
                                                    ? "text-violet-400 border-violet-900 hover:bg-white/20 hover:border-violet-600"
                                                    : "border-transparent hover:border-violet-600"
                                                    }`}
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
            <SidebarFooter className="bg-violet-950/10">
                <SidebarMenu>
                    <SidebarMenuSubItem>
                        {/* dropdown menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="border border-transparent hover:border-violet-600">
                                    <User2 /> {firstname}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem onClick={handleSettings}
                                    className="flex justify-between border border-transparent hover:border-violet-600"
                                >
                                    <span>Settings</span>
                                    <Settings />
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}
                                    className="flex justify-between border border-transparent hover:border-violet-600"
                                >
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
