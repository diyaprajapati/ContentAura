import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
    return (
        <div
            className={cn(
                "mx-auto px-4",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;