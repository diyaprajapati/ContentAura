import React, { useState } from "react";
import { SchemaData } from "@/lib/types/schema";
import { createContent, updateContent } from "@/lib/api/content"; // Adjust the import path for your API logic
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContentData, ContentResponse } from "@/lib/types/content";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DynamicFormProps {
    schema?: SchemaData;
    schemaId: string; // Pass schema ID for API requests
    initialValues?: ContentData;
    onSubmit: (updatedContent: ContentResponse) => void;
    onCancel?: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, schemaId, initialValues, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialValues || {});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!initialValues && Object.keys(initialValues).length > 0;

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
        setIsSubmitting(true);

        try {
            let response;

            if (isEditMode) {
                // Update content if in edit mode
                response = await updateContent(schemaId, requestData); // Use the existing content ID
            } else {
                // Create new content if not in edit mode
                response = await createContent(schemaId, requestData);
            }

            // Construct a valid ContentResponse object
            const updatedContent: ContentResponse = {
                id: response.data.id || initialValues?.id, // Retain the ID from the response or initialValues
                schemaId: schemaId,
                data: formData,
                createdAt: response.data.createdAt || initialValues?.createdAt || new Date().toISOString(),
                updatedAt: response.data.updatedAt || new Date().toISOString(),
            };

            alert(`Content ${isEditMode ? "updated" : "created"} successfully!`);
            onSubmit(updatedContent); // Notify parent with updated content
        } catch (error) {
            console.error(`Error ${isEditMode ? "updating" : "creating"} content:`, error);
            alert(`Failed to ${isEditMode ? "update" : "create"} content.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render fields dynamically
    // const renderFields = () => {
    //     if (!schema?.content?.properties) return <p>No fields available</p>;

    //     return Object.entries(schema.content.properties).map(([name, details]: [string, any]) => {
    //         const isRequired = details.required;
    //         const inputType = details.type === "integer" ? "number" : details.type;

    //         return (
    //             <div key={name} className="flex flex-col gap-2 mb-4">
    //                 <Label htmlFor={name} className="font-semibold">
    //                     {name} {isRequired && <span className="text-red-500">*</span>}
    //                 </Label>
    //                 <Input
    //                     id={name}
    //                     type={inputType}
    //                     required={isRequired}
    //                     value={formData[name] || ""}
    //                     className="hover:border-violet-400/60 transition-all w-full"
    //                     onChange={(e) => handleInputChange(name, e.target.value)}
    //                 />
    //             </div>
    //         );
    //     });
    // };

    // Updated renderFields method
    const renderFields = () => {
        if (!schema?.content?.properties) return <p>No fields available</p>;

        return Object.entries(schema.content.properties).map(([name, details]: [string, any]) => {
            const isRequired = details.required;
            const fieldType = details.type;

            if (fieldType === "List") {
                return (
                    <div key={name} className="flex flex-col gap-2 mb-4">
                        <Label htmlFor={name} className="font-semibold">
                            {name} (List) {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                        {formData[name]?.map((item: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    id={`${name}-${index}`}
                                    type="text"
                                    value={item}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [name]: prev[name].map((el: string, i: number) =>
                                                i === index ? e.target.value : el
                                            ),
                                        }))
                                    }
                                    className="w-full"
                                />
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [name]: prev[name].filter((_: any, i: number) => i !== index),
                                        }))
                                    }
                                    className="bg-red-500/80 hover:bg-red-600/40 text-white px-2 py-1"
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [name]: [...(prev[name] || []), ""],
                                }))
                            }
                            className="bg-transparent border hover:bg-slate-500/10"
                        >
                            <Plus />
                        </Button>
                    </div>
                );
            }

            if (fieldType === "Bool") {
                return (
                    <div key={name} className="flex flex-col gap-2 mb-4">
                        <Label htmlFor={name} className="font-semibold">
                            {name} (Boolean) {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [name]: value === "1" ? 1 : 0,
                                }))
                            }
                            value={formData[name] !== undefined ? String(formData[name]) : ""}
                        >
                            <SelectTrigger className="border border-gray-300 rounded-md hover:border-violet-400/60 transition-all">
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Yes (1)</SelectItem>
                                <SelectItem value="0">No (0)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                );
            }

            if (fieldType === "Link") {
                return (
                    <div key={name} className="flex flex-col gap-2 mb-4">
                        <Label htmlFor={name} className="font-semibold">
                            {name} (Link) {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                            id={name}
                            type="url"
                            required={isRequired}
                            value={formData[name] || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [name]: e.target.value,
                                }))
                            }
                            className="hover:border-violet-400/60 transition-all w-full"
                            placeholder="Enter a valid URL"
                        />
                    </div>
                );
            }

            // Default case for other types
            const inputType = fieldType === "integer" ? "number" : fieldType;
            return (
                <div key={name} className="flex flex-col gap-2 mb-4">
                    <Label htmlFor={name} className="font-semibold">
                        {name} {isRequired && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                        id={name}
                        type={inputType}
                        required={isRequired}
                        value={formData[name] || ""}
                        className="hover:border-violet-400/60 transition-all w-full"
                        onChange={(e) => handleInputChange(name, e.target.value)}
                    />
                </div>
            );
        });
    };


    return (
        <div className="border border-gray-600/50 px-6 py-8 rounded-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                {renderFields()}
                <div className="md:flex md:flex-row flex flex-col md:gap-x-8 gap-y-4">
                    <Button
                        className="w-full"
                        disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Submit"}
                    </Button>
                    {isEditMode && (
                        <Button onClick={onCancel} className="w-full bg-transparent border hover:bg-slate-200/10">
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;
