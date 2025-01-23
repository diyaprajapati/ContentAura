import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllProjects } from "@/lib/api/project";
import { getAllSchemasByProjectId } from "@/lib/api/schema";
import { ProjectData } from "@/lib/types/project";
import { SchemaData } from "@/lib/types/schema";
import { useEffect, useState } from "react";
import DynamicForm from "./DynamicForm";

const Content = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [selectedSchema, setSelectedSchema] = useState<string>('');
    const [schemas, setSchemas] = useState<SchemaData[]>([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [loadingSchemas, setLoadingSchemas] = useState<boolean>(false);

    // Fetch projects when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjects();
                setProjects(response?.data || []);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Initialize selected project and schema from localStorage
    useEffect(() => {
        const storedProject = localStorage.getItem("selectedProject") || '';
        const storedSchema = localStorage.getItem("selectedSchema") || '';
        setSelectedProject(storedProject);
        setSelectedSchema(storedSchema);
    }, []);

    // Fetch schemas when `selectedProject` changes
    useEffect(() => {
        if (!selectedProject) return;

        const fetchSchemas = async () => {
            setLoadingSchemas(true);
            try {
                const response = await getAllSchemasByProjectId(selectedProject);
                setSchemas(response.data || []);
            } catch (error) {
                console.error("Error fetching schemas:", error);
            } finally {
                setLoadingSchemas(false);
            }
        };

        fetchSchemas();
    }, [selectedProject]);

    // Handle project selection change
    const handleProjectChange = (value: string) => {
        setSelectedProject(value);
        setSchemas([]);
        setSelectedSchema('');
        localStorage.setItem("selectedProject", value);
        localStorage.removeItem("selectedSchema");
    };

    // Handle schema selection change
    const handleSchemaChange = (value: string) => {
        setSelectedSchema(value);
        localStorage.setItem("selectedSchema", value);
    };

    const formatFields = (schema: SchemaData | undefined) => {
        if (!schema?.content?.properties) return "No fields";

        return Object.entries(schema.content.properties).map(([name, details]: [string, any]) => {
            const isRequired = details.required;
            return (
                <div key={name}>
                    <strong>{name}</strong>: {details.type} {isRequired ? "(Required)" : "(Optional)"}
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full md:items-center gap-6">
                {/* Label */}
                <div>
                    <Label className="font-bold md:text-5xl text-4xl">Content</Label>
                </div>
                {/* Dropdowns */}
                <div className="flex flex-col gap-3 md:flex md:flex-row md:gap-6">
                    {/* Project Dropdown */}
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
                                            <SelectItem key={project.id} value={project.id.toString()}>
                                                {project.title}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Schema Dropdown */}
                    <div>
                        <Select onValueChange={handleSchemaChange} value={selectedSchema}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a Schema" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Schemas</SelectLabel>
                                    {loadingSchemas ? (
                                        <SelectItem value="loading" disabled>
                                            Loading schemas...
                                        </SelectItem>
                                    ) : (
                                        schemas.map((schema) => (
                                            <SelectItem key={schema.id} value={schema.id.toString()}>
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
            {/* Fields according to selected schema and project */}
            <div className="flex flex-col">
                {formatFields(schemas.find((schema) => schema.id.toString() === selectedSchema))}
            </div>

            <div>
                <DynamicForm
                    schema={schemas.find((schema) => schema.id.toString() === selectedSchema)}
                    schemaId={selectedSchema}
                />

            </div>
        </div>
    );
};

export default Content;
