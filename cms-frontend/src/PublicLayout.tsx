import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SidebarNav } from "./pages/Footer/Components/SidebarNav";

const sidebarNavItems = [
    { title: "About Us", href: "/public/about", },
    { title: "Contact Us", href: "/public/contact", },
    { title: "Privacy Policy", href: "/public/privacy", },
    { title: "Terms of Service", href: "/public/terms", },
]

export default function PublicLayout() {
    return (
        <div>
            <Toaster />
            <Sonner />
            <main className='flex-1 flex flex-col'>
                <div className="space-y-6 p-10 pb-16">
                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">Our Policies & Contact</h2>
                        <p className="text-muted-foreground">
                            Learn more about our policies, company, and how to contact us.
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
        </div>
    )
}