import { Label } from "@/components/ui/label";
import { DataTableSchema } from "./DataTableSchema";
import { AddSchemaDialogbox } from "./AddSchemaDialogbox";

export default function Schema() {

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
