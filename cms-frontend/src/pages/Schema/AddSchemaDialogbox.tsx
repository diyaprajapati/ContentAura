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
import { toast } from "@/hooks/use-toast"
import { createSchema } from "@/lib/api/schema"
import { useState } from "react"

interface AddSchemaDialogboxProps {
    projectId: string | undefined;
    onSchemaCreated: () => void;
}

export function AddSchemaDialogbox({ projectId, onSchemaCreated }: AddSchemaDialogboxProps) {

    const [name, setName] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast({
                title: "Error",
                description: "Schema name cannot be empty.",
                variant: "destructive",
            });
            return;
        }
        if (!projectId) {
            toast({
                title: "Error",
                description: "Project ID is missing.",
                variant: "destructive",
            });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await createSchema(projectId as string, { name, content: { foo: 0, bar: '' } });
            console.log("API Response:", response);

            if (response.status === 201 || response.status === 200) {
                toast({
                    title: "Success",
                    description: "Schema created successfully.",
                    variant: "default",
                });

                onSchemaCreated(); // Notify parent to refresh the schema list
                setOpen(false);
            } else {
                throw new Error("Failed to create schema");
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "Failed to create schema. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ButtonAdd label="Add Schema"></ButtonAdd>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Schema</DialogTitle>
                    <DialogDescription>
                        Fill the required field and Submit when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Schema Name"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </ Dialog>
    )
}
