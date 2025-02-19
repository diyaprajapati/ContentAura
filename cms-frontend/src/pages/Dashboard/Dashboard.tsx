import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TypingAnimation from "@/components/ui/typing-animation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChartGraph } from "./PiChartGraph";
import { Overview } from "./Overview";
import { RecentSales } from "./RecentSales";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export default function Dashboard() {
  const navigate = useNavigate();
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

  return (
    <div className="flex flex-col m-2 mx-5">
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <TypingAnimation duration={100}>
            {('Welcome back, ' + firstname + '!') as unknown as string}
          </TypingAnimation>
        </div>
        <div>
          Here's a quick overview of your projects and activities.
        </div>
      </div>

      {/* data of dashboard */}
      <Tabs defaultValue="overview" className="space-y-4 mt-10 lg:m-10">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-rows-2 md:grid-flow-col gap-4">
            {/* <PiChartGraph /> */}
            <div className="md:row-span-3">
              <PieChartGraph />
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}
