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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"


export function AddFieldDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonAdd label='Add Field'></ButtonAdd>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Field</DialogTitle>
                    <DialogDescription>
                        Fill all fields and Click save when you're done.
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Type
                        </Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Types</SelectLabel>
                                    <SelectItem value="num">Number</SelectItem>
                                    <SelectItem value="str">String</SelectItem>
                                    <SelectItem value="list">List</SelectItem>
                                    <SelectItem value="bool">Boolean</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
