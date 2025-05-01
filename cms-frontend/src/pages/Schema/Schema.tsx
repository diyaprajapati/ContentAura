import { Label } from "@/components/ui/label";
import { DataTableSchema, SchemaColumn } from "./DataTableSchema";
import { AddSchemaDialogbox } from "./AddSchemaDialogbox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteSchema, getAllSchemasByProjectId, updateSchema } from "@/lib/api/schema";
import { toast } from "@/hooks/use-toast";
import { SchemaRequestData } from "@/lib/types/schema";
import Footer from "../Footer/Footer";
import LogoSpinner from "../Spinner/LogoSpinner";

export default function Schema() {
    const { projectId } = useParams();
    const [schemas, setSchemas] = useState<SchemaColumn[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // console.log(schemas);

    // Update schema to add field
    const handleUpdateSchema = async (schemaId: number, updatedData: { name: string }) => {
        try {
            const existingSchema = schemas.find(schema => schema.id === schemaId.toString());
            if (!existingSchema) {
                throw new Error("Schema not found");
            }

            const requestData: SchemaRequestData = {
                name: updatedData.name,
            };

            const response = await updateSchema(schemaId.toString(), requestData);

            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Schema name updated successfully",
                });
                await fetchSchemas(); // Refresh the schemas list
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update schema name",
                variant: "destructive",
            });
        }
    };

    // Fetch schemas via project id
    const fetchSchemas = async () => {
        if (!projectId) return;

        setIsLoading(true);
        try {
            const response = await getAllSchemasByProjectId(projectId);
            console.log(response.data);
            if (response && response.status === 200) {
                setSchemas(response.data.map((schema) => ({
                    id: schema.id.toString(),
                    name: schema.name,
                    fields: schema.content && schema.content.properties
                        ? Object.keys(schema.content.properties).length
                        : 0,
                    lastUpdated: schema.createdAt
                        ? new Date(schema.createdAt).toLocaleDateString()
                        : new Date().toLocaleDateString(),
                })));
            } else {
                toast({
                    title: "Error fetching schemas",
                    description: "Failed to load schemas. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSchemas();
    }, [projectId]);

    // For delete schema
    const handleDeleteSchema = async (id: string) => {
        try {
            const response = await deleteSchema(Number(id));
            if (response && response.status === 200 || response.status === 204) {
                toast({
                    title: "Success",
                    description: "Schema Deleted Successfully!",
                    variant: "default",
                });

                await fetchSchemas(); // Refresh the data after successful deletion
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete schema. Please try again.",
                variant: "destructive"
            });
        }
    };

    function handleSchemaAdded() {
        fetchSchemas();
    }

    // Skeleton loader
    if (isLoading) {
        return (
            <div className="flex flex-col gap-8 mx-8 my-4 justify-center items-center">
                <LogoSpinner /> {/* Using LogoSpinner instead of Skeleton loader */}
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex flex-col gap-8 mx-8 my-4">
                <div className="flex justify-between w-full items-center ml-5">
                    <div className="">
                        <Label className="font-bold md:text-5xl text-4xl">Schemas</Label>
                    </div>
                    <div>
                        <AddSchemaDialogbox projectId={projectId} onSchemaCreated={handleSchemaAdded} />
                    </div>
                </div>

                <DataTableSchema
                    data={schemas}
                    onDelete={handleDeleteSchema}
                    schemaId={0}
                    currentName=""
                    onUpdate={handleUpdateSchema}
                    key={schemas.length}
                />
            </div>
            <div className="mb-2">
                <Footer />
            </div>
        </div>
    );
}
