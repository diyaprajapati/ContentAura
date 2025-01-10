import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EditDialogProps = {
  children: React.ReactNode;
  projectId: number;
  currentTitle: string;
  currentDescription: string;
  onUpdate: (projectId: number, updatedData: { title: string; description: string }) => void;
};

export const EditDialog: React.FC<EditDialogProps> = ({ children, projectId, currentTitle, currentDescription, onUpdate }) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Project updated successfully!",
      });
      onUpdate(projectId, response.data); // Update the parent state
      window.location.reload();
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error updating project!",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Make changes to your project details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}

                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <Button
              type="button"
              onClick={handleEdit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="ghost" className="border-2">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
