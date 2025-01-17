import { Label } from '@/components/ui/label';
import { FieldColumn, FieldTable } from './FieldTable';
import { AddFieldDialog } from './AddFieldDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFieldsBySchemaId } from '@/lib/api/schema';
import { toast } from '@/hooks/use-toast';

export default function Fields() {
    const { schemaId } = useParams<{ schemaId: string }>();
    const [fields, setFields] = useState<FieldColumn[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    console.log(fields, isLoading);

    useEffect(() => {
        if (!schemaId) {
            navigate('/schema');
            return;
        }
    }, [schemaId, navigate]);

    if (!schemaId) {
        return null; // or a loading spinner
    }

    const fetchFields = async () => {
        if (!schemaId) return;

        setIsLoading(true);
        try {
            const response = await getFieldsBySchemaId(schemaId);
            console.log(response);
            if (response && response.status === 200) {
                setFields(response.data.map((field: any) => ({
                    id: field.id.toString(),
                    name: field.name,
                    type: field.type
                })))
            }
            else {
                toast({
                    title: "Error fetching fields",
                    description: "Failed to load fetch. Please try again.",
                    variant: "destructive",
                })
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    function handleFieldAdded() {
        fetchFields();
    }

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center ml-5 md:mx-16">
                {/* Title */}
                <div className="">
                    <Label className="font-bold md:text-5xl text-4xl">Fields</Label>
                    <p>Fields for Schema id: {schemaId}</p>
                </div>
                {/* Button */}
                <div className='md:mr-28'>
                    {/* dialog box to add schema */}
                    <AddFieldDialog schemaId={schemaId} onFieldCreated={handleFieldAdded} />
                </div>
            </div>
            {/* table */}
            <div>
                <FieldTable />
            </div>
        </div>
    );
}
