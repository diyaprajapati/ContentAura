// import { useEffect, useState } from 'react';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
// import { getAllProjects } from '@/lib/api/project';
// import { getAllSchemasByProjectId } from '@/lib/api/schema';
// import { SchemaData } from '@/lib/types/schema';
// import { ProjectData } from '@/lib/types/project';

// const SchemaTab = () => {
//     const [projects, setProjects] = useState<ProjectData[]>([]);
//     const [selectedProject, setSelectedProject] = useState<string>('');
//     const [schemas, setSchemas] = useState<SchemaData[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [initialLoading, setInitialLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await getAllProjects();
//                 setProjects(response?.data || []);
//             } catch (error) {
//                 console.error('Error fetching projects:', error);
//             } finally {
//                 setInitialLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     // useEffect(() => {
//     //     if (!selectedProject) return;

//     //     const fetchSchemas = async () => {
//     //         setLoading(true);
//     //         try {
//     //             const response = await getAllSchemasByProjectId(selectedProject);
//     //             setSchemas(response?.data || []);
//     //         } catch (error) {
//     //             console.error('Error fetching schemas:', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchSchemas();
//     // }, [selectedProject]);
//     useEffect(() => {
//         if (!selectedProject) return;

//         const fetchSchemas = async () => {
//             setLoading(true);
//             try {
//                 const response = await getAllSchemasByProjectId(selectedProject);
//                 console.log('Fetched Schemas:', response.data); // Inspect this
//                 setSchemas(response.data || []);
//             } catch (error) {
//                 console.error('Error fetching schemas:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemas();
//     }, [selectedProject]);


//     const handleProjectChange = (value: string) => {
//         setSelectedProject(value);
//         setSchemas([]); // Clear schemas when changing projects
//     };

//     return (
//         <div className="flex flex-col gap-8 mx-8 my-4">
//             <div className="flex justify-between w-full items-center ml-5">
//                 <div>
//                     <Label className="font-bold md:text-5xl text-4xl">Schemas</Label>
//                 </div>
//                 <div>
//                     <Select onValueChange={handleProjectChange} value={selectedProject}>
//                         <SelectTrigger className="w-[200px]">
//                             <SelectValue placeholder="Select a project name" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectLabel>Projects</SelectLabel>
//                                 {initialLoading ? (
//                                     <SelectItem value="loading" disabled>
//                                         Loading projects...
//                                     </SelectItem>
//                                 ) : (
//                                     projects.map((project) => (
//                                         <SelectItem
//                                             key={project.id}
//                                             value={project.id.toString()}
//                                         >
//                                             {project.title}
//                                         </SelectItem>
//                                     ))
//                                 )}
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {loading ? (
//                     [...Array(3)].map((_, index) => (
//                         <Card key={index}>
//                             <CardContent className="p-4">
//                                 <Skeleton className="h-4 w-3/4 mb-4" />
//                                 <Skeleton className="h-20 w-full" />
//                             </CardContent>
//                         </Card>
//                     ))
//                 ) : (
//                     schemas.map((schema) => (
//                         <Card key={schema.id} className="hover:shadow-lg transition-shadow">
//                             <CardContent className="p-4">
//                                 <h3 className="font-semibold text-lg mb-2">{schema.name}</h3>
//                                 <div className="space-y-2">
//                                     {schema.content && (
//                                         <>
//                                             <div className="text-sm text-gray-600">
//                                                 Type: {schema.content.type || 'Not specified'}
//                                             </div>
//                                             <div className="text-sm text-gray-600">
//                                                 Required: {schema.content.required ? 'Yes' : 'No'}
//                                             </div>
//                                             {schema.content.properties &&
//                                                 Object.keys(schema.content.properties).length > 0 && (
//                                                     <div className="text-sm text-gray-600">
//                                                         Properties: {Object.keys(schema.content.properties).length}
//                                                     </div>
//                                                 )}
//                                         </>
//                                     )}
//                                     <div className="text-xs text-gray-400">
//                                         Created: {new Date(schema.createdAt).toLocaleDateString()}
//                                     </div>
//                                 </div>

//                                 {/* Display fields */}
//                                 {Array.isArray(schema.fields) && schema.fields.length > 0 ? (
//                                     <div className="mt-4">
//                                         <h4 className="font-semibold text-sm">Fields:</h4>
//                                         <ul className="list-disc list-inside text-sm text-gray-600">
//                                             {schema.fields.map((field) => (
//                                                 <li key={field.id}>
//                                                     <strong>{field.name}:</strong> {field.type}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 ) : (
//                                     <div className="text-sm text-gray-500">No fields defined</div>
//                                 )}
//                             </CardContent>
//                         </Card>
//                     ))
//                 )}
//             </div>

//             {!loading && selectedProject && schemas.length === 0 && (
//                 <div className="text-center text-gray-500">
//                     No schemas found for this project
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SchemaTab;

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllProjects } from '@/lib/api/project';
import { getAllSchemasByProjectId } from '@/lib/api/schema';
import { SchemaData } from '@/lib/types/schema';
import { ProjectData } from '@/lib/types/project';

const SchemaTab = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [schemas, setSchemas] = useState<SchemaData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

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

    useEffect(() => {
        if (!selectedProject) return;

        const fetchSchemas = async () => {
            setLoading(true);
            try {
                const response = await getAllSchemasByProjectId(selectedProject);
                console.log('Fetched Schemas:', response.data); // Inspect schema data
                setSchemas(response.data || []);
            } catch (error) {
                console.error('Error fetching schemas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemas();
    }, [selectedProject]);

    const handleProjectChange = (value: string) => {
        setSelectedProject(value);
        setSchemas([]); // Clear schemas when changing projects
    };

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center ml-5">
                <div>
                    <Label className="font-bold md:text-5xl text-4xl">Schemas</Label>
                </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    [...Array(3)].map((_, index) => (
                        <Card key={index}>
                            <CardContent className="p-4">
                                <Skeleton className="h-4 w-3/4 mb-4" />
                                <Skeleton className="h-20 w-full" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    schemas.map((schema) => {
                        const fields = schema.content?.properties
                            ? Object.entries(schema.content.properties).map(([name, details]: any) => ({
                                name,
                                type: details?.type || 'Unknown',
                                required: details?.required || false,
                            }))
                            : [];

                        return (
                            <Card key={schema.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{schema.name}</h3>
                                    <div className="space-y-2">
                                        {schema.content && (
                                            <>
                                                <div className="text-sm text-gray-600">
                                                    Type: {schema.content.type || 'Not specified'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Required: {schema.content.required ? 'Yes' : 'No'}
                                                </div>
                                                {fields.length > 0 && (
                                                    <div className="text-sm text-gray-600">
                                                        Total Fields: {fields.length}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        <div className="text-xs text-gray-400">
                                            Created: {schema.createdAt ? new Date(schema.createdAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </div>

                                    {/* Display fields */}
                                    {fields.length > 0 ? (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-sm">Fields:</h4>
                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                {fields.map((field, index) => (
                                                    <li key={index}>
                                                        <strong>{field.name}:</strong> {field.type}{" "}
                                                        {field.required ? "(Required)" : "(Optional)"}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-500">No fields defined</div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>

            {!loading && selectedProject && schemas.length === 0 && (
                <div className="text-center text-gray-500">
                    No schemas found for this project
                </div>
            )}
        </div>
    );
};

export default SchemaTab;
