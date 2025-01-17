import { Label } from "@/components/ui/label";
import { DataTableSchema, SchemaColumn } from "./DataTableSchema";
import { AddSchemaDialogbox } from "./AddSchemaDialogbox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteSchema, getAllSchemasByProjectId } from "@/lib/api/schema";
import { toast } from "@/hooks/use-toast";

export default function Schema() {
    const { projectId } = useParams();
    const [schemas, setSchemas] = useState<SchemaColumn[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log(schemas, isLoading);

    const fetchSchemas = async () => {
        if (!projectId) return;

        setIsLoading(true);
        try {
            const response = await getAllSchemasByProjectId(projectId);
            if (response && response.status === 200) {
                setSchemas(response.data.map((schema) => ({
                    id: schema.id.toString(),
                    name: schema.name,
                    fields: schema.content ? Object.keys(schema.content.properties).length : 0,
                    lastUpdated: schema.createdAt ?? (new Date).toLocaleDateString(),
                })));
            }
            else {
                toast({
                    title: "Error fetching schemas",
                    description: "Failed to load schemas. Please try again.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchSchemas();
    }, [projectId]);

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

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center ml-5">
                {/* Title */}
                <div className="">
                    <Label className="font-bold md:text-5xl text-4xl">Schemas</Label>
                </div>
                {/* Button */}
                <div>
                    {/* dialog box to add schema */}
                    <AddSchemaDialogbox projectId={projectId} onSchemaCreated={handleSchemaAdded} />
                </div>
            </div>

            {/* data */}
            <DataTableSchema data={schemas} onDelete={handleDeleteSchema} key={schemas.length} />
        </div>
    )
}
