import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Copy, Database } from 'lucide-react';
import { getAllProjects } from '@/lib/api/project';
import { getAllSchemasByProjectId } from '@/lib/api/schema';
import { SchemaData } from '@/lib/types/schema';
import { ProjectData } from '@/lib/types/project';
import { toast } from 'sonner';
import Footer from '../Footer/Footer';
import LogoSpinner from '../Spinner/LogoSpinner';

const SchemaTab = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>(() => {
        return localStorage.getItem('selectedProject') || '';
    });
    const [schemas, setSchemas] = useState<SchemaData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [copiedSchemaId, setCopiedSchemaId] = useState<number | null>(null);

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
        setSchemas([]); // Clear schemas when project changes
        localStorage.setItem('selectedProject', value);
    };

    const copyToClipboard = (projectId: string, schemaId: number) => {
        // const url = `http://localhost:8081/api/${projectId}/${schemaId}`;
        const url = `https://api.contentaura.xyz/api/${projectId}/${schemaId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopiedSchemaId(schemaId);
                toast.success('URL Copied!');
                setTimeout(() => setCopiedSchemaId(null), 2000);
            })
            .catch((err) => console.error('Failed to copy URL:', err));
    };

    const getFieldCount = useCallback((schema: SchemaData) => {
        if (!schema.content?.properties) return 0;
        return Object.keys(schema.content.properties).length;
    }, []);

    return (
        <div className="flex flex-col min-h-screen mx-8 my-4">
            {/* Main Content */}
            <div className="flex-grow flex flex-col gap-8">
                <div className="flex justify-between w-full items-center">
                    <div className='flex flex-col '>
                        <Label className="font-bold md:text-5xl text-4xl">Schemas</Label>
                        <p className='text-gray-400 pr-2'>View and manage your database schemas. Select a project to see its available schemas.</p>
                    </div>
                    <Select onValueChange={handleProjectChange} value={selectedProject}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select a project name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Projects</SelectLabel>
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

                <div className="glass-panel rounded-xl overflow-hidden mb-8">
                    <Table>
                        <TableHeader>
                            <TableRow className='hover:bg-muted/5'>
                                <TableHead className='w-[30%]'>Schema Name</TableHead>
                                <TableHead className="text-center">Fields</TableHead>
                                <TableHead className='w-[40%] text-right'>URL</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        <LogoSpinner /> {/* Show LogoSpinner during loading */}
                                    </TableCell>
                                </TableRow>
                            ) : schemas.length > 0 ? (
                                schemas.map((schema) => (
                                    <TableRow key={schema.id}>
                                        <TableCell className="font-medium">
                                            <span
                                                className="flex items-center gap-3 cursor-pointer hover:text-violet-500 hover:underline transition-all"
                                                onClick={() => navigate(`/fields/${schema.id}`)}
                                            >
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                    <Database className="w-6 h-6 text-primary" />
                                                </div>
                                                {schema.name}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">{getFieldCount(schema)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                onClick={() => copyToClipboard(selectedProject, schema.id)}
                                                className="bg-transparent hover:bg-slate-400/10"
                                            >
                                                <Copy className="w-4 h-4" />
                                                {copiedSchemaId === schema.id ? 'Copied!' : 'Copy URL'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-gray-500">
                                        {selectedProject ? 'No schemas found for this project' : 'Select a project to view schemas'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Footer Stays at Bottom */}
            <Footer />
        </div>
    );
};

export default SchemaTab;
