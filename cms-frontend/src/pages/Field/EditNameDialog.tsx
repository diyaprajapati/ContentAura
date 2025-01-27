import { Button } from "@/components/ui/button"
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
import { renameSchemaField } from "@/lib/api/schema";
import { useEffect, useState } from "react";


// // edit name props
// type EditNameDialogProps = {
//     children: React.ReactNode,
//     schemaId: number;
//     currentTitle: string;
//     onUpdate: (newName: string) => void;
// }

// export function EditNameDialog({ children, currentTitle, onUpdate }: EditNameDialogProps) {

//     const [newName, setNewName] = useState(currentTitle);

//     const handleSave = () => {
//         onUpdate(newName);
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 {children}
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>Change Field Name</DialogTitle>
//                     <DialogDescription>
//                         Click save when you're done.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         {/* name edit */}
//                         <Label htmlFor="name" className="text-right">
//                             Name
//                         </Label>
//                         <Input
//                             id="name"
//                             value={newName}
//                             onChange={(e) => setNewName(e.target.value)}
//                             className="col-span-3"
//                         />
//                     </div>
//                 </div>
//                 {/* save button */}
//                 <DialogFooter>
//                     <Button onClick={handleSave} >Save</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

type EditNameDialogProps = {
    children: React.ReactNode;
    schemaId: number;
    currentTitle: string;
    onUpdate: (schemaId: number, oldName: string, newName: string) => void; // Update only the title
};

export function EditNameDialog({
    children,
    schemaId,
    currentTitle,
    onUpdate,
}: EditNameDialogProps) {
    const [newTitle, setNewTitle] = useState(currentTitle);
    const [error, setError] = useState<string | null>(null);

    console.log(setError);

    // Sync state when currentTitle changes
    useEffect(() => {
        setNewTitle(currentTitle);
    }, [currentTitle]);

    // const handleSave = async () => {
    //     // Validation
    //     if (!newTitle.trim()) {
    //         setError("Field name cannot be empty.");
    //         return;
    //     }
    //     if (newTitle === currentTitle) {
    //         setError("Field name is unchanged.");
    //         return;
    //     }
    //     setError(null); // Clear previous errors

    //     try {
    //         await renameSchemaField(schemaId, currentTitle, newTitle); // API call
    //         onUpdate(schemaId, currentTitle, newTitle); // Notify parent
    //     } catch (error) {
    //         console.error("Error renaming field:", error);
    //         setError("Failed to rename field. Please try again.");
    //     }
    // };

    const handleSave = async () => {
        console.log("Schema ID:", schemaId);  // Debugging line to ensure schemaId is correct

        if (!schemaId) {
            console.error("Schema ID is undefined. Cannot rename field.");
            return;
        }

        try {
            await renameSchemaField(schemaId, currentTitle, newTitle);
            onUpdate(schemaId, currentTitle, newTitle); // Notify parent about update
        } catch (error) {
            console.error("Error renaming field:", error);
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Field Name</DialogTitle>
                    <DialogDescription>Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        {/* name edit */}
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                {/* save button */}
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleSave}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
