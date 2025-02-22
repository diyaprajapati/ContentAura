import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { updateSchema } from "@/lib/api/schema";
import { SchemaRequestData } from "@/lib/types/schema";
import React, { useState } from "react"

// edit schema name props
type EditSchemaDialogProps = {
    children: React.ReactNode;
    schemaId: number;
    currentName: string;
    onUpdate: (schemaId: number, updatedData: { name: string }) => void;
}

export const EditSchemaDialog: React.FC<EditSchemaDialogProps> = ({ children, schemaId, currentName, onUpdate }) => {

    const [name, setName] = useState(currentName);
    const [loading, setLoading] = useState(false);

    // handle edit name
    const handleEdit = async () => {
        setLoading(true);
        try {
            const updatedData: SchemaRequestData = {
                name,
            };
            const response = await updateSchema(schemaId.toString(), updatedData)
            console.log(response);

            // if response ok
            if (response && response.status === 200) {
                toast({
                    title: "Schema name updated successfully!",
                });
                onUpdate(schemaId, { name });
                window.location.reload();
            }
        }
        catch (error) {
            toast({
                title: "Error updating Schema!",
                description: "Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Schema Name</DialogTitle>
                    <DialogDescription>Make changes to your schema details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div>
                            {/* name */}
                            <Label htmlFor="name" className="block text-sm font-medium">Title</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-3">
                        {/* save button */}
                        <Button
                            type="button"
                            onClick={handleEdit}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                        {/* cancle button */}
                        <Button type="button" variant="ghost" className="border-2">
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
