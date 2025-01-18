"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";

export type CheckboxDataProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
}
export function CheckboxData({ checked, onChange }: CheckboxDataProps) {
    const handleCheckboxChange = (event: any) => {
        onChange(event.target.checked);
    };
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id="apiKey"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <Label
                htmlFor="apiKey"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Generate API key
            </Label>
        </div>
    )
}
