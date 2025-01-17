import { Label } from '@/components/ui/label';
import { FieldTable } from './FieldTable';
import { AddFieldDialog } from './AddFieldDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Fields() {
    const { schemaId } = useParams<{ schemaId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!schemaId) {
            navigate('/schema'); // or wherever you want to redirect if there's no ID
            return;
        }
    }, [schemaId, navigate]);

    if (!schemaId) {
        return null; // or a loading spinner
    }

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center ml-5">
                {/* Title */}
                <div className="">
                    <Label className="font-bold md:text-5xl text-4xl">Fields</Label>
                    <p>Fields for Schema id: {schemaId}</p>
                </div>
                {/* Button */}
                <div>
                    {/* dialog box to add schema */}
                    <AddFieldDialog />
                </div>
            </div>
            {/* table */}
            <div>
                <FieldTable />
            </div>
        </div>
    );
}
