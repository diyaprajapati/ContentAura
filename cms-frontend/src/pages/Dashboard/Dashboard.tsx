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
import LogoSpinner from "../Spinner/LogoSpinner";


export default function Dashboard() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [schemaCount, setSchemaCount] = useState<number | null>(null);
  const [contentCount, setContentCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // Spinner state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchAllData = async () => {
      try {
        const [userRes, schemaRes, contentRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/user-details`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/schema/count/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/content/count/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!userRes.ok) throw new Error();

        const userData = await userRes.json();
        setFirstname(userData.firstname);
        setSchemaCount(schemaRes.data);
        setContentCount(contentRes.data);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/auth");
      }
    };

    fetchAllData();
  }, [navigate]);

  if (loading) return <LogoSpinner />;

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

      <Tabs defaultValue="overview" className="space-y-4 mt-10 lg:m-10">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-rows-2 md:grid-flow-col gap-4">
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
                  {schemaCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Contents</CardTitle>
                <TableOfContents className="text-gray-400 w-5" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl md:text-5xl font-bold">
                  {contentCount}
                </div>
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
  );
}
