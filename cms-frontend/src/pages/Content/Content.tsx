import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllProjects } from "@/lib/api/project";
import { getAllSchemasByProjectId } from "@/lib/api/schema";
import { deleteContent, getAllContentBySchemaId } from "@/lib/api/content";
import { ProjectData } from "@/lib/types/project";
import { SchemaData } from "@/lib/types/schema";
import { ContentData, ContentResponse } from "@/lib/types/content";
import { useEffect, useMemo, useState } from "react";
import DynamicForm from "./DynamicForm";
import { ContentTable } from "./ContentTable";
import Footer from "../Footer/Footer";
import LogoSpinner from "../Spinner/LogoSpinner";

const Content = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [schemas, setSchemas] = useState<SchemaData[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<string>("");
  const [contentData, setContentData] = useState<ContentResponse[]>([]);
  const memoizedContentData = useMemo(() => contentData, [contentData]);

  const [editingContent, setEditingContent] = useState<ContentResponse | null>(
    null
  );
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingSchemas, setLoadingSchemas] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // console.log(contentData);

  const selectedSchemaData = useMemo(() => {
    return schemas.find((schema) => schema.id.toString() === selectedSchema);
  }, [schemas, selectedSchema]);

  // Fetch all projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response?.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setInitialLoading(false);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch schemas when the selected project changes
  useEffect(() => {
    if (!selectedProject) return;

    const fetchSchemas = async () => {
      setLoadingSchemas(true);
      try {
        const response = await getAllSchemasByProjectId(selectedProject);
        setSchemas(response?.data || []);
      } catch (error) {
        console.error("Error fetching schemas:", error);
      } finally {
        setLoadingSchemas(false);
      }
    };

    fetchSchemas();
  }, [selectedProject]);

  // Fetch content when schema is selected
  useEffect(() => {
    if (!selectedSchema) return;

    if (schemas.length > 0 && schemas[0].projectId?.toString() === selectedProject) return;

    const fetchContentData = async () => {
      try {
        const response = await getAllContentBySchemaId(selectedSchema);
        const contentResponses: ContentResponse[] =
          response?.data.map((data) => ({
            id: typeof data.id === "number" ? data.id : 0,
            schemaId: selectedSchema,
            data: data as ContentData,
            createdAt:
              typeof data.createdAt === "string"
                ? data.createdAt
                : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })) || [];
        setContentData(contentResponses);
      } catch (error) {
        console.error("Error fetching content data:", error);
      }
    };

    fetchContentData();
  }, [selectedSchema]);

  useEffect(() => {
    const storedProject = localStorage.getItem("selectedProject");
    const storedSchema = localStorage.getItem("selectedSchema");

    if (storedProject) setSelectedProject(storedProject);
    if (storedSchema) setSelectedSchema(storedSchema);
  }, []);

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    setSelectedSchema("");
    setSchemas([]);
    setContentData([]);
    setEditingContent(null);
    localStorage.setItem("selectedProject", value);
    localStorage.removeItem("selectedSchema");
  };

  const handleSchemaChange = (value: string) => {
    setSelectedSchema(value);
    setContentData([]); // Reset content data when schema changes
    setEditingContent(null);
    localStorage.setItem("selectedSchema", value);
  };

  const handleEdit = (content: ContentResponse) => {
    console.log(content);
    // setEditingContent(content);
    setEditingContent({
      id: content.id,
      schemaId: content.schemaId,
      data: content.data,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    });
  };

  const handleDelete = async (contentId: number) => {
    try {
      await deleteContent(contentId);
      setContentData((prev) => prev.filter((item) => item.id !== contentId));
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handleFormSubmit = (updatedContent: ContentResponse) => {
    setContentData((prev) =>
      prev.some((item) => item.id === updatedContent.id)
        ? prev.map((item) =>
          item.id === updatedContent.id ? updatedContent : item
        )
        : [...prev, updatedContent]
    );
    setEditingContent(null);
  };

  const projectOptions = useMemo(
    () =>
      projects.map((project) => (
        <SelectItem key={project.id} value={project.id.toString()}>
          {project.title}
        </SelectItem>
      )),
    [projects]
  );

  const schemaOptions = useMemo(
    () =>
      schemas.map((schema) => (
        <SelectItem key={schema.id} value={schema.id.toString()}>
          {schema.name}
        </SelectItem>
      )),
    [schemas]
  );


  // Skeleton loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LogoSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col gap-8 mx-8 my-4 pb-6">
        {/* Header */}
        <div className="flex justify-between items-center gap-6">
          <div className="">
            <Label className="font-bold text-4xl md:text-5xl">Content</Label>
            <p className="text-gray-400 pr-2">View and manage your content. Select a project and schema to see and create new content.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Project Selector */}
            <Select onValueChange={handleProjectChange} value={selectedProject}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Projects</SelectLabel>
                  {initialLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading projects...
                    </SelectItem>
                  ) : (
                    projectOptions
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Schema Selector */}
            <Select onValueChange={handleSchemaChange} value={selectedSchema}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a schema" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Schemas</SelectLabel>
                  {loadingSchemas ? (
                    <SelectItem value="loading" disabled>
                      Loading schemas...
                    </SelectItem>
                  ) : (
                    schemaOptions
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Form and Table */}
        <div className="flex flex-col gap-8">
          {selectedSchema ? (
            <>
              {/* Form */}
              <DynamicForm
                schema={selectedSchemaData}
                schemaId={selectedSchema}
                initialValues={editingContent?.data || {}}
                onSubmit={(updatedContent: Record<string, any>) => {
                  const contentResponse: ContentResponse = {
                    id: editingContent?.id || 0,
                    schemaId: selectedSchema,
                    data: updatedContent as ContentData,
                    createdAt:
                      editingContent?.createdAt || new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };

                  handleFormSubmit(contentResponse);
                }}
                onCancel={() => setEditingContent(null)}
              />

              {/* Table */}
              <ContentTable
                contentData={memoizedContentData}
                onEdit={(content: ContentResponse) => handleEdit(content)}
                onDelete={(contentId: number) => handleDelete(contentId)}
                editingContentId={editingContent?.id || null}
              />
            </>
          ) : (
            <p>Select a schema to manage its content.</p>
          )}
        </div>
      </div>
      <div className="mb-2">
        <Footer />
      </div>
    </div>
  );
};

export default Content;
