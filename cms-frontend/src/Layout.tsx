import { useEffect } from 'react';
import { AppSidebar } from './components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { Outlet, useNavigate } from 'react-router-dom'


export default function Layout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            navigate('/auth');
        }
    })
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}
