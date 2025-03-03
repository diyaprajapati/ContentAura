import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TypingAnimation from "@/components/ui/typing-animation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Overview } from "./Overview";
import { RecentApis } from "./RecentApis";
import { PieChartGraph } from "./PieChartGraph";
import axios from "axios";
import { Activity, SwatchBook, TableOfContents, TrendingUp } from "lucide-react";
import Footer from "../Footer/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [schemaCount, setSchemaCount] = useState<number | null>(null);
  const [contentCount, setContentCount] = useState<number | null>(null);


  // fetch firstname from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate('/auth')
        return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/user-details`, {
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
    };
    const fetchCounts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        const [schemaRes, contentRes] = await Promise.all([
          axios.get("http://localhost:8080/api/schema/count/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/content/count/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSchemaCount(schemaRes.data);
        setContentCount(contentRes.data);

      } catch {
        localStorage.removeItem("token");
        navigate("/auth");
      }
    };

    fetchUserDetails();
    fetchCounts();
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Schemas</CardTitle>
                <SwatchBook className="text-gray-400 w-5" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl md:text-5xl font-bold">
                  {schemaCount !== null ? `${schemaCount}` : "Loading..."}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Contents
                </CardTitle>
                <TableOfContents className="text-gray-400 w-5" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl md:text-5xl font-bold">
                  {contentCount !== null ? `${contentCount}` : "Loading..."}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p> */}
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row justify-between">
                <CardTitle>Overview</CardTitle>
                <TrendingUp className="h-4 w-4" />
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row justify-between">
                <CardTitle>Recently used APIs</CardTitle>
                <Activity className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <RecentApis />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <Footer />
    </div>
  )
}
