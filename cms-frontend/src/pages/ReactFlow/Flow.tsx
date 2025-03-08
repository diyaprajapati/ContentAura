// import { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     ReactFlow,
//     Controls,
//     Background,
//     useNodesState,
//     useEdgesState,
//     addEdge,
// } from '@xyflow/react';

// import '@xyflow/react/dist/style.css';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { ProjectData } from '@/lib/types/project';
// import { getAllProjects } from '@/lib/api/project';
// //@ts-ignore
// const fetchProjectHierarchy = async (projectId, token) => {
//     try {
//         const response = await axios.get(`http://localhost:8080/api/projects/hierarchy/${projectId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching project hierarchy:', error);
//         return null;
//     }
// };

// export default function Flow() {
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//     const [selectedProject, setSelectedProject] = useState<string>(() => {
//         return localStorage.getItem('selectedProject') || '';
//     });
//     const [initialLoading, setInitialLoading] = useState<boolean>(true);
//     const [projects, setProjects] = useState<ProjectData[]>([]);
//     const token = localStorage.getItem('token');

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

//     const handleProjectChange = (value: string) => {
//         setSelectedProject(value);
//         localStorage.setItem('selectedProject', value);
//     };

//     useEffect(() => {
//         if (selectedProject) {
//             fetchProjectHierarchy(selectedProject, token).then((data) => {
//                 if (data) {
//                     const newNodes = [];
//                     //@ts-ignore
//                     const newEdges = [];

//                     newNodes.push({
//                         id: `project-${data.projectId}`,
//                         position: { x: 0, y: 0 },
//                         data: { label: data.projectTitle },
//                         style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #64748b' }
//                     });

//                     const spacingX = 250;
//                     const spacingY = 100;
//                     const baseX = 100;
//                     const baseY = 50;

//                     //@ts-ignore
//                     data.schemas.forEach((schema, index) => {
//                         const schemaId = `schema-${schema.schemaId}`;
//                         newNodes.push({
//                             id: schemaId,
//                             position: { x: baseX + index * spacingX, y: baseY },
//                             data: { label: schema.schemaName },
//                             style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #64748b' }
//                         });
//                         newEdges.push({
//                             id: `e-project-${schemaId}`,
//                             source: `project-${data.projectId}`,
//                             target: schemaId,
//                             style: { stroke: '#64748b' }
//                         });

//                         if (schema.fields && typeof schema.fields === 'object') {
//                             const fieldsArray = Object.entries(schema.fields);
//                             fieldsArray.forEach(([fieldName, fieldType], fieldIndex) => {
//                                 const fieldId = `field-${schema.schemaId}-${fieldIndex}`;
//                                 newNodes.push({
//                                     id: fieldId,
//                                     position: { x: baseX + index * spacingX, y: baseY + (fieldIndex + 1) * spacingY },
//                                     data: { label: `${fieldName}: ${fieldType}` },
//                                     style: { background: '#334155', color: '#f8fafc', border: '1px solid #94a3b8' }
//                                 });
//                                 newEdges.push({
//                                     id: `e-${schemaId}-${fieldId}`,
//                                     source: schemaId,
//                                     target: fieldId,
//                                     style: { stroke: '#94a3b8' }
//                                 });
//                             });
//                         } else {
//                             console.warn(`schema.fields is not an array for schemaId: ${schema.schemaId}`, schema.fields);
//                         }
//                     });

//                     //@ts-ignore
//                     setNodes(newNodes);
//                     //@ts-ignore
//                     setEdges(newEdges);
//                 }
//             }).catch(err => console.error("Error fetching hierarchy:", err));
//         }
//     }, [selectedProject, token]);

//     const onConnect = useCallback(
//         //@ts-ignore
//         (params) => setEdges((eds) => addEdge({ ...params, style: { stroke: '#64748b' } }, eds)),
//         [setEdges]
//     );

//     return (
//         <div className='w-full h-full bg-transparent'>
//             <Select onValueChange={handleProjectChange} value={selectedProject}>
//                 <SelectTrigger className="w-[200px]">
//                     <SelectValue placeholder="Select a project name" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                         <SelectLabel>Projects</SelectLabel>
//                         {initialLoading ? (
//                             <SelectItem value="loading" disabled>Loading projects...</SelectItem>
//                         ) : (
//                             projects.map((project) => (
//                                 <SelectItem key={project.id} value={project.id.toString()}>
//                                     {project.title}
//                                 </SelectItem>
//                             ))
//                         )}
//                     </SelectGroup>
//                 </SelectContent>
//             </Select>
//             <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 fitView
//             >
//                 <Controls className='text-black' />
//                 <Background color='#8B5CF6' gap={16} className='dark:bg-slate-900' />
//             </ReactFlow>
//         </div>
//     );
// }

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectData } from '@/lib/types/project';
import { getAllProjects } from '@/lib/api/project';

const fetchProjectHierarchy = async (projectId: string, token: string | null) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/projects/hierarchy/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching project hierarchy:', error);
        return null;
    }
};

// Unique custom node colors for better visualization
const nodeColors = {
    project: {
        background: '#1e293b',
        border: '#8B5CF6',
        text: '#f8fafc'
    },
    schema: {
        background: '#334155',
        border: '#A78BFA',
        text: '#f8fafc'
    },
    field: {
        background: '#475569',
        border: '#C4B5FD',
        text: '#f8fafc'
    }
};

export default function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedProject, setSelectedProject] = useState<string>(() => {
        return localStorage.getItem('selectedProject') || '';
    });
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const token = localStorage.getItem('token');

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

    const handleProjectChange = (value: string) => {
        setSelectedProject(value);
        localStorage.setItem('selectedProject', value);
    };

    const autoArrangeNodes = (data: any) => {
        const newNodes: any[] = [];
        const newEdges: any[] = [];

        // Add project node at the center top
        newNodes.push({
            id: `project-${data.projectId}`,
            position: { x: 0, y: 0 },
            data: { label: data.projectTitle },
            style: {
                background: nodeColors.project.background,
                color: nodeColors.project.text,
                border: `2px solid ${nodeColors.project.border}`,
                borderRadius: '8px',
                padding: '10px',
                width: '180px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }
        });

        // Dynamic calculations for layout
        const schemaCount = data.schemas.length;
        const schemaSpacing = Math.max(300, 900 / schemaCount); // Adjust spacing based on schema count
        const schemaStartX = -(schemaSpacing * (schemaCount - 1)) / 2;
        const schemaY = 120; // Fixed Y position for all schemas

        // Process schemas
        data.schemas.forEach((schema: any, schemaIndex: number) => {
            const schemaId = `schema-${schema.schemaId}`;
            const schemaX = schemaStartX + (schemaIndex * schemaSpacing);

            // Add schema node
            newNodes.push({
                id: schemaId,
                position: { x: schemaX, y: schemaY },
                data: { label: schema.schemaName },
                style: {
                    background: nodeColors.schema.background,
                    color: nodeColors.schema.text,
                    border: `2px solid ${nodeColors.schema.border}`,
                    borderRadius: '8px',
                    padding: '10px',
                    width: '160px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }
            });

            // Connect project to schema
            newEdges.push({
                id: `e-project-${schemaId}`,
                source: `project-${data.projectId}`,
                target: schemaId,
                animated: true,
                style: { stroke: '#A78BFA', strokeWidth: 2 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#A78BFA'
                }
            });

            // Process fields for this schema
            if (schema.fields && typeof schema.fields === 'object') {
                const fieldsArray = Object.entries(schema.fields);
                const fieldCount = fieldsArray.length;

                // Calculate field layout in a vertical column
                const fieldY = schemaY + 100; // Start position for fields
                const fieldSpacing = 70; // Vertical spacing between fields

                fieldsArray.forEach(([fieldName, fieldType], fieldIndex) => {
                    const fieldId = `field-${schema.schemaId}-${fieldIndex}`;

                    // Add field node
                    newNodes.push({
                        id: fieldId,
                        position: { x: schemaX, y: fieldY + (fieldIndex * fieldSpacing) },
                        data: { label: `${fieldName}: ${fieldType}` },
                        style: {
                            background: nodeColors.field.background,
                            color: nodeColors.field.text,
                            border: `2px solid ${nodeColors.field.border}`,
                            borderRadius: '6px',
                            padding: '8px',
                            width: '150px',
                            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
                        }
                    });

                    // Connect schema to field
                    newEdges.push({
                        id: `e-${schemaId}-${fieldId}`,
                        source: schemaId,
                        target: fieldId,
                        style: { stroke: '#C4B5FD', strokeWidth: 1.5 },
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                            color: '#C4B5FD'
                        }
                    });
                });
            }
        });

        return { newNodes, newEdges };
    };

    useEffect(() => {
        if (selectedProject && token) {
            fetchProjectHierarchy(selectedProject, token)
                .then((data) => {
                    if (data) {
                        const { newNodes, newEdges } = autoArrangeNodes(data);
                        //@ts-ignore
                        setNodes(newNodes);
                        //@ts-ignore
                        setEdges(newEdges);
                    }
                })
                .catch(err => console.error("Error fetching hierarchy:", err));
        }
    }, [selectedProject, token, setNodes, setEdges]);

    const onConnect = useCallback(
        //@ts-ignore
        (params: any) => setEdges((eds) => addEdge({
            ...params,
            animated: true,
            style: { stroke: '#A78BFA', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#A78BFA'
            }
        }, eds)),
        [setEdges]
    );

    return (
        <div className='w-full h-full bg-transperant bg-opacity-95'>
            <div className="p-4 flex items-center gap-4">
                {/* <h2 className="text-violet-200 font-semibold">Project Schema Visualizer</h2> */}
                <Select onValueChange={handleProjectChange} value={selectedProject}>
                    <SelectTrigger className="w-[250px] border-primary">
                        <SelectValue placeholder="Select a project name" />
                    </SelectTrigger>
                    <SelectContent className="border-primary">
                        <SelectGroup>
                            <SelectLabel className="text-violet-300">Projects</SelectLabel>
                            {initialLoading ? (
                                <SelectItem value="loading" disabled>Loading projects...</SelectItem>
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
            <div className="h-[calc(100%-60px)]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                >
                    <Controls className='bg-slate-800 text-violet-300 border border-violet-500 rounded-md' />
                    <Background color='#A78BFA' gap={24} size={1.5} className='dark:bg-slate-900' />
                </ReactFlow>
            </div>
        </div>
    );
}