import { Label } from "@/components/ui/label";
import { FieldColumn, FieldTable } from "./FieldTable";
import { AddFieldDialog } from "./AddFieldDialog";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFieldsBySchemaId, updateSchema } from "@/lib/api/schema";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { SchemaRequestData } from "@/lib/types/schema";
import Footer from "../Footer/Footer";
import LogoSpinner from "../Spinner/LogoSpinner";

export default function Fields() {
  const { schemaId } = useParams<{ schemaId: string }>();
  const [fields, setFields] = useState<FieldColumn[]>([]);
  const [data, setData] = useState({
    name: "",
    content: {
      properties: {},
      required: false,
      type: "object",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // console.log(fields, isLoading);

  useEffect(() => {
    if (!schemaId) {
      navigate("/schema");
      return;
    }
    fetchFields();
  }, [schemaId]);

  if (!schemaId) {
    return null; // or a loading spinner
  }

  // fetch fields via schema id
  const fetchFields = async () => {
    if (!schemaId) return;

    setIsLoading(true);
    try {
      const response = await getFieldsBySchemaId(schemaId);
      if (response && response.status === 200) {
        setData(response.data);
        if (!response.data.content) {
          setFields([]);
          return;
        }
        //@ts-ignore
        setFields(
          Object.entries(response.data.content.properties).map(
            ([key, value]) => ({
              name: key,
              //@ts-ignore
              type: value.type,
            })
          )
        );
      } else {
        toast({
          title: "Error fetching fields",
          description: "Failed to load fetch. Please try again.",
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

  // handle fields to add
  function handleFieldAdded(name: string, type: string) {
    setData((prev) => ({
      ...prev,
      content: {
        properties: {
          ...(prev.content?.properties || {}),
          [name]: {
            type: type,
            required: true,
          },
        },
        required: true,
        type: "object",
      },
    }));

    setFields((prev) => [...prev, { name, type }]);
  }

  // save button fun
  async function onSave() {
    try {
      console.log("data", data);
      const request = {
        name: data.name,
        content: {
          properties: data.content.properties,
          required: data.content.required,
          type: data.content.type,
        },
      }
      const response = await updateSchema(schemaId!, request as SchemaRequestData);
      if (response && response.status === 200) {
        toast({
          title: "Success",
          description: "Schema updated successfully.",
          variant: "default",
        });
        await fetchFields(); // Refresh the fields
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update schema. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleDeleteField = async (fieldName: string) => {
    try {
      // Make API call to delete the field
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/schema/${schemaId}/property/properties.${fieldName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete field');
      }

      // Update local state to remove the field
      setFields(fields.filter(field => field.name !== fieldName));
      toast({
        title: `Field ${fieldName} deleted successfully`
      });
    } catch (error) {
      console.error('Error deleting field:', error);
      toast({
        title: "Failed to delete field"
      })
    }
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 mx-8 my-4">
        <LogoSpinner /> {/* Replace skeleton with LogoSpinner */}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col gap-8 mx-8 my-4">
        <div className="flex justify-between w-full items-center ml-5 md:mx-16">
          {/* Title */}
          <div className="">
            <Label className="font-bold md:text-5xl text-4xl">Fields</Label>
            <p>Fields for Schema id: {schemaId}</p>
          </div>
          {/* Button */}
          <div className="md:mr-28">
            {/* dialog box to add fields */}
            <AddFieldDialog
              schemaId={schemaId}
              onFieldCreated={handleFieldAdded}
            />
            {/* button to save the fields */}
            <Button onClick={onSave} className="ml-5">Save</Button>
          </div>
        </div>
        {/* table */}
        <div>
          <FieldTable fields={fields} onDeleteField={handleDeleteField} />
        </div>
      </div>
      <div className="mb-2">
        <Footer />
      </div>
    </div>
  );
}
