import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllProjects } from '@/lib/api/project';
import { getAllSchemasByProjectId } from '@/lib/api/schema';
import { SchemaData } from '@/lib/types/schema';
import { ProjectData } from '@/lib/types/project';

const SchemaTab = () => {
    // state for storing project list
    const [projects, setProjects] = useState<ProjectData[]>([]);
    // state for storing the selected project id
    const [selectedProject, setSelectedProject] = useState<string>(() => {
        return localStorage.getItem('selectedProject') || '';
    });
    // state for storing schema data of selected project
    const [schemas, setSchemas] = useState<SchemaData[]>([]);
    // state to haandle loading state for schemas
    const [loading, setLoading] = useState<boolean>(false);
    // to handle loading state for projects
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    // fetch the list of projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjects();
                setProjects(response?.data || []);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
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

    // handle selected project
    const handleProjectChange = (value: string) => {
        setSelectedProject(value);
        setSchemas([]); //clear schema when switch to another proj
        localStorage.setItem('selectedProject', value);
    };

    // show schema according to project
    const formatFields = (schema: SchemaData) => {
        if (!schema.content?.properties) return 'No fields';

        return Object.entries(schema.content.properties).map(([name, details]: [string, any]) => {
            const isRequired = details.required;
            return (
                <div key={name}>
                    <strong>{name}</strong>: {details.type} {isRequired ? '(Required)' : '(Optional)'}
                </div>
            );
        });
    };

    // number of fields
    const getFieldCount = (schema: SchemaData) => {
        if (!schema.content?.properties) return 0;
        return Object.keys(schema.content.properties).length;
    };

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center">
                {/* label */}
                <div>
                    <Label className="font-bold md:text-5xl text-4xl">Schemas</Label>
                </div>
                {/* dropdown to select project name */}
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
            </div>

            {/* show schema according to selected project*/}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[40%]'>Schema Name</TableHead>
                            <TableHead className="text-center">Fields</TableHead>
                            <TableHead className='w-[50%] text-right'>Field Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* loading effect */}
                    <TableBody>
                        {loading ? (
                            [...Array(3)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                </TableRow>
                            ))
                            // data of schrma according to project
                        ) : schemas.length > 0 ? (
                            schemas.map((schema) => (
                                <TableRow key={schema.id}>
                                    <TableCell className="font-medium">{schema.name}</TableCell>
                                    <TableCell className="text-center">{getFieldCount(schema)}</TableCell>
                                    <TableCell className="text-sm text-gray-300 text-right ">
                                        <div className='flex flex-col'>
                                            {formatFields(schema)}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                            // if there is no elected project or there is no schema of project
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    {selectedProject ? 'No schemas found for this project' : 'Select a project to view schemas'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SchemaTab;
