import { Label } from '@/components/ui/label';
import { FieldTable } from './FieldTable';
import { AddFieldDialog } from './AddFieldDialog';
import { useParams } from 'react-router-dom';

export default function Fields() {
    const { id } = useParams();

    if (!id) {
        return <div>Error: Schema ID is missing.</div>;
    }

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center ml-5">
                {/* Title */}
                <div className="">
                    <Label className="font-bold md:text-5xl text-4xl">Fields</Label>
                    <p>Fields for Schema id: {id}</p>
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
