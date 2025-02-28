import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { TabsContent } from '@radix-ui/react-tabs'
import Login from './Login'
import Signup from './Signup'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function Authentication() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-30"></div>

      {/* Move Content Aura to the top-left */}
      <div className="absolute top-4 left-4 bg-gradient-to-br from-indigo-500 to-blue-200 bg-clip-text text-transparent font-bold italic cursor-pointer text-xl z-10">
        Content Aura
      </div>

      <Toaster />
      <Sonner />

      <Tabs defaultValue="Login" className="w-[90%] md:w-[50%] z-10">
        <div className="w-full flex justify-center">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="Signup">SignUp</TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full flex justify-center">
          <TabsContent value="Login" className="w-full min-h-[360px]">
            <Login />
          </TabsContent>
          <TabsContent value="Signup" className="w-full min-h-[360px]">
            <Signup />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
