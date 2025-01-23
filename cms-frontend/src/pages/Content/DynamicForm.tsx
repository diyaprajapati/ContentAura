// import { Input } from "@/components/ui/input";
// import { SchemaData } from "@/lib/types/schema"
// import { useState } from "react";

// interface DynamicFormProps {
//     schema: SchemaData | undefined;
//     onSubmit: (formData: Record<string, any>) => void;
// }

// const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
//     const [formData, setFormData] = useState<Record<string, any>>({});

//     // Handle input changes
//     const handleInputChange = (fieldName: string, value: any) => {
//         setFormData((prev) => ({
//             ...prev,
//             [fieldName]: value,
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };

//     // Render fields dynamically
//     const renderFields = () => {
//         if (!schema?.content?.properties) return <p>No fields available</p>;

//         return Object.entries(schema.content.properties).map(([name, details]: [string, any]) => {
//             const isRequired = details.required;
//             const inputType = details.type === "integer" ? "number" : details.type; // Map integer to number input
//             return (
//                 <div key={name} className="flex flex-col gap-2 mb-4">
//                     <label htmlFor={name} className="font-semibold">
//                         {name} {isRequired && <span className="text-red-500">*</span>}
//                     </label>
//                     <Input
//                         id={name}
//                         type={inputType}
//                         required={isRequired}
//                         className="border border-gray-300 rounded p-2"
//                         onChange={(e) => handleInputChange(name, e.target.value)}
//                     />
//                 </div>
//             );
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             {renderFields()}
//             <button
//                 type="submit"
//                 className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default DynamicForm;

import React, { useState } from "react";
import { SchemaData } from "@/lib/types/schema";
import { createContent } from "@/lib/api/content"; // Adjust the import path for your API logic
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DynamicFormProps {
    schema: SchemaData | undefined;
    schemaId: string; // Pass schema ID for API requests
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, schemaId }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    // Handle input changes
    const handleInputChange = (fieldName: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Structure data for API
        const requestData = {
            data: formData, // Matches the JSONB structure expected in the database
        };

        try {
            // Call the API to save content
            const response = await createContent(schemaId, requestData);
            console.log("Content saved successfully:", response.data);
            alert("Content saved successfully!");
        } catch (error) {
            console.error("Error saving content:", error);
            alert("Failed to save content.");
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
                type="submit">
                Submit
            </Button>
        </form>
    );
};

export default DynamicForm;
