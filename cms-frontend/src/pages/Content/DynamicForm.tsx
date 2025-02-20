import React, { useEffect, useState } from "react";
import { SchemaData } from "@/lib/types/schema";
import { createContent, updateContent } from "@/lib/api/content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContentData, ContentResponse } from "@/lib/types/content";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DynamicFormProps {
  schema?: SchemaData;
  schemaId: string;
  initialValues?: ContentData;
  onSubmit: (updatedContent: ContentResponse) => void;
  onCancel?: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  schemaId,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    //@ts-ignore
    initialValues?.data || {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialValues?.id;

  // Convert value based on field type
  const convertValue = (value: any, type: string) => {
    if (value === "" || value === null || value === undefined) {
      return null;
    }

    switch (type) {
      case "integer":
        return parseInt(value, 10);
      case "boolean":
        return value === "true" || value === true || value === 1;
      case "array":
        return Array.isArray(value) ? value : [];
      default:
        return value;
    }
  };

  // Update form data when initialValues change
  useEffect(() => {
    if (initialValues?.data) {
      //@ts-ignore
      setFormData(initialValues.data);
    }
  }, [initialValues]);

  const handleInputChange = (fieldName: string, value: any, type: string) => {
    const convertedValue = convertValue(value, type);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: convertedValue,
    }));
  };

  // reset to empty state
  const clearForm = () => {
    setFormData({});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const processedFormData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          //@ts-ignore
          const fieldType = schema?.content?.properties[key]?.type;
          return {
            ...acc,
            [key]: convertValue(value, fieldType),
          };
        },
        {}
      );

      const requestData = { data: processedFormData };
      let response;

      if (isEditMode && initialValues?.id) {
        response = await updateContent(String(initialValues.id), requestData);
      } else {
        response = await createContent(schemaId, requestData);
      }

      const updatedContent: ContentResponse = {
        id: response.data.id || initialValues?.id || 0,
        schemaId: schemaId,
        data: processedFormData,
        createdAt:
          response.data.createdAt ||
          initialValues?.createdAt ||
          new Date().toISOString(),
        updatedAt: response.data.updatedAt || new Date().toISOString(),
      };

      onSubmit(updatedContent);
      clearForm();

      if (!isEditMode) {
        setFormData({});
      }
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} content:`,
        error
      );
      alert(`Failed to ${isEditMode ? "update" : "create"} content.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render fields dynamically
  const renderFields = () => {
    if (!schema?.content?.properties) return <p>No fields available</p>;

    return Object.entries(schema.content.properties).map(
      ([name, details]: [string, any]) => {
        const isRequired = details.required;
        const fieldType = details.type;

        if (fieldType === "array") {
          return (
            <div key={name} className="flex flex-col gap-2 mb-4">
              <Label htmlFor={name} className="font-semibold">
                {name} (List){" "}
                {isRequired && <span className="text-red-500">*</span>}
              </Label>
              {formData[name]?.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    id={`${name}-${index}`}
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleInputChange(
                        name,
                        formData[name].map((el: string, i: number) =>
                          i === index ? e.target.value : el
                        ),
                        "array"
                      )
                    }
                    className="w-full"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        name,
                        formData[name].filter(
                          (_: any, i: number) => i !== index
                        ),
                        fieldType
                      )
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
                  handleInputChange(
                    name,
                    [...(formData[name] || []), ""],
                    fieldType
                  )
                }
                className="bg-transparent border hover:bg-slate-500/10"
              >
                <Plus />
              </Button>
            </div>
          );
        }

        if (fieldType === "boolean") {
          return (
            <div key={name} className="flex flex-col gap-2 mb-4">
              <Label htmlFor={name} className="font-semibold">
                {name} (Boolean){" "}
                {isRequired && <span className="text-red-500">*</span>}
              </Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange(name, value, "boolean")
                }
                value={
                  formData[name] !== undefined ? String(formData[name]) : ""
                }
              >
                <SelectTrigger className="border border-gray-300 rounded-md hover:border-violet-400/60 transition-all">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"true"}>Yes (1)</SelectItem>
                  <SelectItem value={"false"}>No (0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }

        if (fieldType === "Link") {
          return (
            <div key={name} className="flex flex-col gap-2 mb-4">
              <Label htmlFor={name} className="font-semibold">
                {name} (Link){" "}
                {isRequired && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id={name}
                type="url"
                required={isRequired}
                value={formData[name] || ""}
                onChange={(e) =>
                  handleInputChange(name, e.target.value, fieldType)
                }
                className="hover:border-violet-400/60 transition-all w-full"
                placeholder="Enter a valid URL"
              />
            </div>
          );
        }

        if (fieldType === "string") {
          return (
            <div key={name} className="flex flex-col gap-2 mb-4">
              <Label htmlFor={name} className="font-semibold">
                {name} (String){" "}
                {isRequired && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id={name}
                required={isRequired}
                value={formData[name] || ""}
                onChange={(e) =>
                  handleInputChange(name, e.target.value, fieldType)
                }
                className="hover:border-violet-400/60 transition-all w-full"
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
              onChange={(e) =>
                handleInputChange(name, e.target.value, fieldType)
              }
            />
          </div>
        );
      }
    );
  };

  return (
    <div className="border border-gray-600/50 px-6 py-8 rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        {renderFields()}
        <div className="md:flex md:flex-row flex flex-col md:gap-x-8 gap-y-4">
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Submit"}
          </Button>
          {isEditMode && (
            <Button
              onClick={() => {
                if (onCancel) onCancel();
                clearForm();
              }}
              className="w-full bg-transparent border hover:bg-slate-200/10"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
