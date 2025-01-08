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

export function DialogBox() {
    return (
        <Dialog>
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
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="name"
                            placeholder=""
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="username"
                            placeholder=""
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
