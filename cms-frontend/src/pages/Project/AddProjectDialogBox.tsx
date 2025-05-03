import { Button } from "@/components/ui/button"
import ButtonAdd from "@/components/ui/ButtonAdd"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { getAuthToken } from "@/lib/utils"

// validate data
const projectSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(30, "Title must not exceed 30 characters"),
    description: z.string()
        .min(1, "Description is required")
        .max(200, "Description must not exceed 100 characters"),
    generateApiKey: z.boolean(),
});

type FormData = z.infer<typeof projectSchema>;

type AddProjectDialogBoxProps = {
    onProjectAdded: () => void;
}

export function AddProjectDialogBox({ onProjectAdded }: AddProjectDialogBoxProps) {

    const [formData, setFromData] = useState({
        title: "",
        description: "",
        generateApiKey: true,
    });

    const [open, setOpen] = useState(false);

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    // handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFromData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    // for submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            projectSchema.parse({ ...formData, generateApiKey: true });
            const token = getAuthToken();

            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/projects`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setOpen(false);
                toast({ title: "Project added successfully!" });
                onProjectAdded();
            }
            // console.log(formData);
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                const errorObject: Partial<Record<keyof FormData, string>> = {};
                err.errors.forEach(({ path, message }) => {
                    if (path[0] in formData) {
                        errorObject[path[0] as keyof FormData] = message;
                    }
                });
                setErrors(errorObject);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ButtonAdd label="Add Project" > </ButtonAdd>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                    <DialogDescription>
                        Fill all required fields to add your new project
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        {/* title */}
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {/* error if title is empty or more than 30 len */}
                        {errors.title && (
                            <p className="text-red-500 text-sm col-span-4 text-center">{errors.title}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        {/* description */}
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            className="col-span-3"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {/* error if desc is empty or more than 100 len */}
                        {errors.description && (
                            <p className="text-red-500 text-sm col-span-4 text-center">{errors.description}</p>
                        )}
                    </div>
                    <div className="flex justify-start ml-32">
                        <div className="flex items-center space-x-2">
                            {/* check box for api */}
                            <Checkbox
                                id="apiKey"
                                checked={true}
                                disabled
                            />

                            <Label
                                htmlFor="apiKey"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Generate API key
                            </Label>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    {/* submit button */}
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
