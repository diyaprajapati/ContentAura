import { Label } from "@/components/ui/label";
import { DataTableSchema } from "./DataTableSchema";
import { AddSchemaDialogbox } from "./AddSchemaDialogbox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSchemasByProjectId } from "./schema";
import { toast } from "@/hooks/use-toast";

interface SchemaData {
    id: number;
    name: string;
    content: any;
}

export default function Schema() {

    const { id: projectId } = useParams<{ id: string }>();
    const [schemas, setSchemas] = useState<SchemaData[]>([]);

    const fetchSchemas = async () => {
        if (!projectId) return;

        try {
            const data = await getSchemasByProjectId(Number(projectId));
            setSchemas(data);
        }
        catch (error: any) {
            toast({
                title: "Error fetching schemas",
                description: error.message
            });
        }
    };

    useEffect(() => {
        fetchSchemas();
    }, [projectId]);

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
                    <AddSchemaDialogbox />
                </div>
            </div>

            {/* data */}
            <DataTableSchema />
        </div>
    )
}
