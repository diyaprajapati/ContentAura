import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import Login from './Login'
import Signup from './Signup'
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Authentication() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[90%] md:w-[50%]">
          <div className="w-full flex justify-center mb-4">
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="w-full flex justify-center">
            <Skeleton className="h-[360px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    // routers and tab to see login signup in one page
    <div className="w-full h-screen flex justify-center items-center">
      <Tabs defaultValue="Login" className="w-[90%] md:w-[50%]">
        <div className="w-full flex justify-center">
          <TabsList className="grid w-full grid-cols-2">
            {/* trigger after click on that */}
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="Signup">SignUp</TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full flex justify-center">
          {/* login */}
          <TabsContent value="Login" className="w-full min-h-[360px]">
            <Login />
          </TabsContent>
          {/* signup */}
          <TabsContent value="Signup" className="w-full min-h-[360px]">
            <Signup />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
