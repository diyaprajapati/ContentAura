import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from "react"

// props
interface AlertBoxProps {
    children: React.ReactNode;
    onConfirm: () => void;
}

export function AlertDeleteField({ children, onConfirm }: AlertBoxProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this field
                        and remove its data from all associated content.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* cancel button */}
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* delete button */}
                    <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-900">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}