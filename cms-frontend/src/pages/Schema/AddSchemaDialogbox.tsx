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

export function AddSchemaDialogbox() {
    return (
        <Dialog>
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
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
