import ButtonAdd from "@/components/ui/ButtonAdd";
import { Label } from "@/components/ui/label";
import { getAllProjects } from "@/lib/api/project";
import { ProjectData } from "@/lib/types/project";
import { useEffect, useState } from "react";

export default function Project() {

    const [projects, setProjects] = useState<ProjectData[]>([]);

    // apicall
    const fetchProject = async () => {
        const res = await getAllProjects();

        if (res?.status === 200) {
            setProjects(res.data);
        }
        else {
            // insert toast ....................................................
            console.log("Error", res);
        }
    }

    useEffect(() => {
        fetchProject();
    }, [])

    return (
        <div className="flex flex-col gap-10 mx-10 my-4">
            <div className="flex justify-between w-full items-center">
                {/* Title */}
                <div className="">
                    <Label className="font-bold text-5xl">Your Projects</Label>
                </div>
                {/* Button */}
                <div className="">
                    <ButtonAdd label="Add Project" />
                </div>
            </div>

            {/* project layout */}
            <div>
                <hr className="ml-10 mr-10" />
                {projects.length > 0 && projects.map(proj => (
                    <div className="m-5 px-5 py-2 flex flex-col gap-7" key={proj.id}>
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold text-xl text-violet-400 hover:text-violet-500 hover:underline transition-all">{proj.title}</Label>
                            <p className="text-base font-medium text-gray-400"> {proj.description}</p>
                            <div className="text-xs font-normal text-slate-400 ">{new Date(proj.createdAt).toLocaleDateString()}</div>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}
