import { Label } from '@/components/ui/label';
import { FieldTable } from './FieldTable';
import { AddFieldDialog } from './AddFieldDialog';

export default function Fields() {
    // const { id } = useParams();

    // Safely fetch the fields based on the id
    // const fields = data?.find((item: { id: string | undefined; }) => item.id === id)?.fields;

    // if (fields === undefined) {
    //     return <div>Loading or No fields found for this ID.</div>;
    // }

    return (
        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center ml-5">
                {/* Title */}
                <div className="">
                    <Label className="font-bold md:text-5xl text-4xl">Fields</Label>
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
