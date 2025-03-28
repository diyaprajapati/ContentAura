import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./Components/SidebarNav"
import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";


const sidebarNavItems = [
  { title: "Profile", href: "/settings", },
  { title: "Change Password", href: "/settings/password", },
]

export default function SettingsLayout() {
  return (
    <SidebarProvider defaultOpen={false} className='flex h-screen mt-1'>
      <Toaster />
      <Sonner />
      <AppSidebar />
      <main className='flex-1 flex flex-col'>
        <SidebarTrigger />
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}