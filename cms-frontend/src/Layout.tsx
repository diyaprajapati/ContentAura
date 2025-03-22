import { useEffect } from 'react';
import { AppSidebar } from './components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            navigate('/auth');
        }
    }, [navigate])

    return (
        <SidebarProvider className='flex h-screen'>
            <Toaster />
            <Sonner />
            <AppSidebar />
            <main className='flex-1 flex flex-col'>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}
