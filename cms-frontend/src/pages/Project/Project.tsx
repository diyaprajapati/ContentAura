import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { getAllProjects } from "@/lib/api/project";
import { ProjectData } from "@/lib/types/project";
import { ToastAction } from "@radix-ui/react-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddProjectDialogBox } from "./AddProjectDialogBox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProjectOptionsDropdown from "./ProjectOptionsDropdown";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import LogoSpinner from "../Spinner/LogoSpinner";


export default function Project() {

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [filter, setFilter] = useState<string>("date");
    const [loading, setLoading] = useState<boolean>(true);

    // apicall
    const fetchProject = async () => {
        setLoading(true);
        try {
            const res = await getAllProjects();
            if (res?.status === 200) {
                setProjects(res.data);
            } else {
                toast({
                    title: `Error occurred: ${res?.statusText || "Unknown error"}`,
                    action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
                });
                console.log("Error", res);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch projects. Please try again.",
                variant: "destructive",
            });
            console.error("API call error", error);
        }
        setLoading(false);
    };

    // handle delete project
    const handleDelete = (projectId: number) => {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
    };

    useEffect(() => {
        fetchProject();
    }, []);

    // Filter and sort projects based on the selected filter
    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) => {
            if (filter === "name") {
                return a.title.localeCompare(b.title);
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }, [projects, filter]);

    // to navigate it to the schema
    const navigate = useNavigate();

    const handleNavigateToSchema = useCallback((projectId: number) => {
        navigate(`/schema/${projectId}`);
    }, [navigate]);

    // Spinner display during loading
    if (loading) {
        return <LogoSpinner />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex flex-col gap-8 mx-8 my-4">
                <div className="flex justify-between w-full items-center ml-5">
                    {/* Title */}
                    <div className="flex flex-col">
                        <Label className="font-bold md:text-5xl text-4xl">Your Projects</Label>
                    </div>
                    {/* Button */}
                    <div className="mr-5">
                        {/* Dialog box */}
                        <AddProjectDialogBox onProjectAdded={fetchProject} />
                    </div>
                </div>
                {/* filter */}
                <div className="flex justify-end">
                    <Select onValueChange={(value) => setFilter(value)} defaultValue="date">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort By</SelectLabel>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* project layout */}
                <div>
                    <hr className="ml-10 mr-10 mb-2" />
                    {sortedProjects.length > 0 ? (
                        sortedProjects.map((proj) => (
                            <div
                                className="mx-5 px-5 py-2 flex flex-col gap-7"
                                key={proj.id}
                            >
                                <div className="flex flex-row justify-between mx-2 items-center">
                                    <div className="flex flex-col gap-2">
                                        {/* title */}
                                        <Label className="font-bold text-xl text-violet-400 hover:text-violet-500 hover:underline transition-all cursor-pointer" onClick={() => handleNavigateToSchema(proj.id)}>
                                            {proj.title}
                                        </Label>
                                        {/* description */}
                                        <p className="text-base font-medium text-gray-400">
                                            {proj.description}
                                        </p>
                                        {/* date */}
                                        <div className="text-xs font-normal text-slate-400">
                                            {new Date(proj.createdAt).toLocaleDateString()} {new Date(proj.createdAt).toLocaleTimeString()}
                                        </div>
                                    </div>

                                    {/* Drop down */}
                                    <ProjectOptionsDropdown
                                        projectId={proj.id}
                                        currentTitle={proj.title} // Pass the title
                                        currentDescription={proj.description} // Pass the description
                                        onDelete={handleDelete}
                                        onUpdate={(projectId, updatedData) => {
                                            setProjects((prevProjects) =>
                                                prevProjects.map((project) =>
                                                    project.id === projectId ? { ...project, ...updatedData } : project
                                                )
                                            );
                                        }}
                                    />
                                </div>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No projects found</p>
                    )}
                </div>
            </div>
            <div className="mb-2">
                <Footer />
            </div>
        </div>
    );
}
