// import React from 'react'

import ButtonAdd from "@/components/ui/ButtonAdd";
import { Label } from "@/components/ui/label";

export default function Project() {

    const dummy = [
        {
            "title": "Test",
            "description": "This is a test project"
        }];

    return (
        <div className="flex flex-col gap-10">
            <div className="flex justify-center items-center">
                {/* Title */}
                <div className="mt-52 flex flex-col gap-6">
                    <Label className="font-bold text-5xl">Your Projects</Label>
                </div>
            </div>
            {/* Button */}
            <div className="flex justify-end mr-10">
                <ButtonAdd label="Add Project" />
            </div>

            {/* project layout */}
            <div>
                <hr className="ml-10 mr-10" />
                {dummy.map(dum => (
                    <div className="m-5 px-5 py-6 flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold text-xl text-violet-500 hover:underline transition-all">{dum.title}</Label>
                            <p className="text-sm font-medium text-gray-400"> {dum.description}</p>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}
