import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

const FadeIn = ({
    children,
    className,
    delay = 0,
    direction = "up",
}: FadeInProps) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("animate-fadeIn");
                            entry.target.classList.remove("opacity-0");
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [delay]);

    const getTransform = () => {
        switch (direction) {
            case "up":
                return "translate-y-4";
            case "down":
                return "-translate-y-4";
            case "left":
                return "translate-x-4";
            case "right":
                return "-translate-x-4";
            default:
                return "translate-y-4";
        }
    };

    return (
        <div
            ref={elementRef}
            className={cn(
                "opacity-0",
                getTransform(),
                "transition-all duration-700 ease-out",
                className
            )}
        >
            {children}
        </div>
    );
};

export default FadeIn;