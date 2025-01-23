import React, { useState } from "react";
import { SchemaData } from "@/lib/types/schema";
import { createContent } from "@/lib/api/content"; // Adjust the import path for your API logic
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContentData, ContentResponse } from "@/lib/types/content";

interface DynamicFormProps {
    schema?: SchemaData;
    schemaId: string; // Pass schema ID for API requests
    initialValues?: ContentData;
    onSubmit: (updatedContent: ContentResponse) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, schemaId, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleInputChange = (fieldName: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestData = { data: formData };

        try {
            setIsSubmitting(true);
            const response = await createContent(schemaId, requestData);

            // Construct a valid ContentResponse object
            const newContent: ContentResponse = {
                id: response.data.id, // Assuming response.data contains the new content ID
                schemaId: schemaId, // Pass the current schemaId
                data: formData, // Use formData as the data
                createdAt: response.data.createdAt || new Date().toISOString(), // Use createdAt from response or fallback
                updatedAt: response.data.updatedAt || new Date().toISOString(), // Use updatedAt from response or fallback
            };

            alert("Content saved successfully!");
            onSubmit(newContent); // Update parent state with new content
        } catch (error) {
            console.error("Error saving content:", error);
            alert("Failed to save content.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render fields dynamically
    const renderFields = () => {
        if (!schema?.content?.properties) return <p>No fields available</p>;

        return Object.entries(schema.content.properties).map(([name, details]: [string, any]) => {
            const isRequired = details.required;
            const inputType = details.type === "integer" ? "number" : details.type;

            return (
                <div key={name} className="flex flex-col gap-2 mb-4">
                    <Label htmlFor={name} className="font-semibold">
                        {name} {isRequired && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                        id={name}
                        type={inputType}
                        required={isRequired}
                        className="border border-gray-300 rounded p-2"
                        onChange={(e) => handleInputChange(name, e.target.value)}
                    />
                </div>
            );
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {renderFields()}
            <Button
                type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Submit"}
            </Button>
        </form>
    );
};

export default DynamicForm;
