import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ContentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export const ContentDialog: React.FC<ContentDialogProps> = ({ isOpen, onClose, title, content }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 whitespace-pre-wrap font-mono text-sm p-4 rounded-md overflow-x-auto">
                    {content}
                </div>
            </DialogContent>
        </Dialog>
    );
};
