import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectData } from '@/lib/types/project';
import { getAllProjects } from '@/lib/api/project';
import LogoSpinner from '../Spinner/LogoSpinner';

const fetchProjectHierarchy = async (projectId: string, token: string | null) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/hierarchy/${projectId}`, {
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
    const [loadingHierarchy, setLoadingHierarchy] = useState<boolean>(false); // State to track project hierarchy loading
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

        // Top level - Project node
        const projectNodeWidth = 250;
        newNodes.push({
            id: `project-${data.projectId}`,
            position: { x: 0, y: 0 },
            data: { label: data.projectTitle },
            deletable: false,
            connectable: false,
            style: {
                background: nodeColors.project.background,
                color: nodeColors.project.text,
                border: `2px solid ${nodeColors.project.border}`,
                borderRadius: '8px',
                padding: '10px',
                width: `${projectNodeWidth}px`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }
        });

        // Calculate layout for second level - Schema nodes
        const schemaCount = data.schemas.length;
        const schemaNodeWidth = 220;
        const schemaVerticalOffset = 150;

        const totalSchemasWidth = schemaCount * schemaNodeWidth + (schemaCount - 1) * 50;
        const schemaStartX = -totalSchemasWidth / 2 + schemaNodeWidth / 2;

        data.schemas.forEach((schema: any, schemaIndex: number) => {
            const schemaId = `schema-${schema.schemaId}`;
            const schemaX = schemaStartX + (schemaIndex * (schemaNodeWidth + 50));
            const schemaY = schemaVerticalOffset;

            newNodes.push({
                id: schemaId,
                position: { x: schemaX, y: schemaY },
                data: { label: schema.schemaName },
                deletable: false,
                connectable: false,
                style: {
                    background: nodeColors.schema.background,
                    color: nodeColors.schema.text,
                    border: `2px solid ${nodeColors.schema.border}`,
                    borderRadius: '8px',
                    padding: '10px',
                    width: `${schemaNodeWidth}px`,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }
            });

            newEdges.push({
                id: `e-project-${schemaId}`,
                source: `project-${data.projectId}`,
                target: schemaId,
                animated: true,
                deletable: false,
                style: { stroke: '#A78BFA', strokeWidth: 2 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#A78BFA'
                }
            });

            if (schema.fields && typeof schema.fields === 'object') {
                const fieldsArray = Object.entries(schema.fields);
                const fieldCount = fieldsArray.length;

                if (fieldCount > 0) {
                    const fieldNodeWidth = 180;
                    const fieldVerticalOffset = 120;

                    const totalFieldsWidth = fieldCount * fieldNodeWidth + (fieldCount - 1) * 30;
                    const fieldStartX = schemaX - totalFieldsWidth / 2 + fieldNodeWidth / 2;

                    fieldsArray.forEach(([fieldName, fieldType], fieldIndex) => {
                        const fieldId = `field-${schema.schemaId}-${fieldIndex}`;
                        const fieldX = fieldStartX + (fieldIndex * (fieldNodeWidth + 30));
                        const fieldY = schemaY + fieldVerticalOffset;

                        newNodes.push({
                            id: fieldId,
                            position: { x: fieldX, y: fieldY },
                            data: { label: `${fieldName}: ${fieldType}` },
                            deletable: false,
                            connectable: false,
                            style: {
                                background: nodeColors.field.background,
                                color: nodeColors.field.text,
                                border: `2px solid ${nodeColors.field.border}`,
                                borderRadius: '6px',
                                padding: '8px',
                                width: `${fieldNodeWidth}px`,
                                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
                            }
                        });

                        newEdges.push({
                            id: `e-${schemaId}-${fieldId}`,
                            source: schemaId,
                            target: fieldId,
                            deletable: false,
                            style: { stroke: '#C4B5FD', strokeWidth: 1.5 },
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                                color: '#C4B5FD'
                            }
                        });
                    });
                }
            }
        });

        return { newNodes, newEdges };
    };

    useEffect(() => {
        if (selectedProject && token) {
            setLoadingHierarchy(true);  // Set loading to true when starting to fetch hierarchy
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
                .catch(err => console.error("Error fetching hierarchy:", err))
                .finally(() => setLoadingHierarchy(false));  // Set loading to false after the fetch is done
        }
    }, [selectedProject, token]);

    const onKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();
        }
    }, []);

    return (
        <div className='w-full h-full bg-transperant bg-opacity-95' onKeyDown={onKeyDown}>
            <div className="p-4 flex items-center gap-4">
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
                {loadingHierarchy ? (
                    <div className="flex justify-center items-center h-full">
                        <LogoSpinner />
                    </div>
                ) : (
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        fitView
                        fitViewOptions={{ padding: 0.3 }}
                        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                        deleteKeyCode={null}
                        nodesDraggable={true}
                        connectOnClick={false}
                        nodesConnectable={false}
                        elementsSelectable={true}
                    >
                        <Controls className='bg-slate-800 text-violet-300 border border-violet-500 rounded-md' />
                        <Background color='#A78BFA' gap={24} size={1.5} className='dark:bg-slate-900' />
                    </ReactFlow>
                )}
            </div>
        </div>
    );
}
