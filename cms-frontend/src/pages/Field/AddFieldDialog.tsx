import { Button } from "@/components/ui/button";
import ButtonAdd from "@/components/ui/ButtonAdd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface AddFieldDialogProps {
  schemaId: string | undefined;
  onFieldCreated: (name: string, type: string) => void;
}

export function AddFieldDialog({
  onFieldCreated,
}: AddFieldDialogProps) {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Field name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (!type) {
      toast({
        title: "Error",
        description: "Please select a field type",
        variant: "destructive",
      });
      return;
    }

    onFieldCreated(name, type);
    setName("");
    setType("");
    setOpen(false);
  };

  // const handleSubmit = async () => {
  //     if (!name.trim()) {
  //         toast({
  //             title: "Error",
  //             description: "Field name cannot be empty.",
  //             variant: "destructive",
  //         });
  //         return;
  //     }
  //     if (!schemaId) {
  //         toast({
  //             title: "Error",
  //             description: "Schema ID is missing.",
  //             variant: "destructive",
  //         });
  //         return;
  //     }
  //     if (!type) {
  //         toast({
  //             title: "Error",
  //             description: "Field type is required.",
  //             variant: "destructive",
  //         });
  //         return;
  //     }
  //     setIsSubmitting(true);
  //     try {
  //         const response = await updateSchema(parseInt(schemaId), { name, type });
  //         console.log(response);

  //         if (response && response.status === 200) {
  //             toast({
  //                 title: "Success",
  //                 description: "Field created successfully.",
  //                 variant: "default",
  //             });

  //             onFieldCreated();
  //             setOpen(false);
  //         }
  //         else {
  //             throw new Error("Failed to create field");
  //         }
  //     }
  //     catch (error) {
  //         console.log(error);
  //         toast({
  //             title: "Error",
  //             description: "Failed to create field. Please try again.",
  //             variant: "destructive",
  //         });
  //     }
  //     finally {
  //         setIsSubmitting(false);
  //     }
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonAdd label="Add Field"></ButtonAdd>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Field name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={(value) => setType(value)}>
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
                  <SelectItem value="link">Link</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
