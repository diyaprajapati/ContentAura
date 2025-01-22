import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllProjects } from "@/lib/api/project";
import { getAllSchemasByProjectId } from "@/lib/api/schema";
import { ProjectData } from "@/lib/types/project";
import { SchemaData } from "@/lib/types/schema";
import { useEffect, useState } from "react";

const Content = () => {

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>(() => {
        return localStorage.getItem('selectedProject') || '';
    })
    const [selectedSchema, setSelectedSchema] = useState<string>(() => {
        return localStorage.getItem('selectedSchema') || '';
    })
    const [schemas, setSchemas] = useState<SchemaData[]>([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    // fetch the list of projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjects();
                setProjects(response?.data || []);
            }
            catch (error) {
                console.error('Error fetching projects: ', error);
            }
            finally {
                setInitialLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // fetch schema according to project
    useEffect(() => {
        if (!selectedProject) return;

        const fetchSchemas = async () => {
            setLoading(true);
            try {
                const response = await getAllSchemasByProjectId(selectedProject);
                setSchemas(response.data || []);
            } catch (error) {
                console.error('Error fetching schemas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemas();
    }, [selectedProject]);

    // const handleProjectChange = (value: string) => {
    //     setSelectedProject(value);
    //     setSchemas([]);
    //     localStorage.setItem('selectedProject', value);
    // };

    const handleProjectChange = (value: string) => {
        setSelectedProject(value); // Update the selected project state
        setSchemas([]); // Clear the schemas array
        setSelectedSchema(''); // Reset the selected schema
        localStorage.setItem('selectedProject', value);
        localStorage.removeItem('selectedSchema');
    };


    const handleSchemaChange = (value: string) => {
        setSelectedSchema(value);
        localStorage.setItem('selectedSchemas', value);
    };

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full md:items-center gap-6">
                {/* label */}
                <div>
                    <Label className="font-bold md:text-5xl text-4xl">Content</Label>
                </div>
                {/* dropdown to select a project */}
                <div className="flex flex-col gap-3 md:flex md:flex-row md:gap-6">
                    <div>
                        <Select onValueChange={handleProjectChange} value={selectedProject}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a project name" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Projects</SelectLabel>
                                    {initialLoading ? (
                                        <SelectItem value="loading" disabled>
                                            Loading projects...
                                        </SelectItem>
                                    ) : (
                                        projects.map((project) => (
                                            <SelectItem
                                                key={project.id}
                                                value={project.id.toString()}
                                            >
                                                {project.title}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select onValueChange={handleSchemaChange} value={selectedSchema}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a Schema" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Schemas</SelectLabel>
                                    {initialLoading ? (
                                        <SelectItem value="loading" disabled>
                                            Loading schemas...
                                        </SelectItem>
                                    ) : (
                                        schemas.map((schema) => (
                                            <SelectItem
                                                key={schema.id}
                                                value={schema.id.toString()}
                                            >
                                                {schema.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content