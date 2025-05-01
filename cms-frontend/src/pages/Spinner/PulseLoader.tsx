import { cn } from "@/lib/utils";
interface PulseLoaderProps {
    size?: "sm" | "md" | "lg";
    color?: "content" | "aura" | "brand";
    className?: string;
}

const PulseLoader = ({
    size = "md",
    color = "content",
    className,
}: PulseLoaderProps) => {
    const dotSize = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
    };

    const gapSize = {
        sm: "gap-2",
        md: "gap-3",
        lg: "gap-4",
    };

    const colorVariants = {
        content: "bg-gradient-to-r from-blue-400 to-blue-500",
        aura: "bg-gradient-to-r from-purple-400 to-purple-600",
        brand: "bg-gradient-to-r from-blue-500 to-purple-600",
    };

    const shadowColor = {
        content: "shadow-blue-500/60",
        aura: "shadow-purple-500/60",
        brand: "shadow-indigo-500/60",
    };

    const glowClasses = {
        content: "after:bg-blue-400/30",
        aura: "after:bg-purple-400/30",
        brand: "after:bg-indigo-400/30",
    };

    return (
        <div className={cn("flex items-center justify-center", gapSize[size], className)}>
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "relative rounded-full animate-[pulse_1.8s_ease-in-out_infinite] shadow-lg",
                        dotSize[size],
                        colorVariants[color],
                        shadowColor[color],
                        glowClasses[color],
                        "after:content-[''] after:absolute after:-inset-3 after:rounded-full after:blur-md after:animate-[pulse_1.8s_ease-in-out_infinite]",
                        {
                            "animation-delay-0": i === 0,
                            "animation-delay-300": i === 1,
                            "animation-delay-600": i === 2,
                            "after:animation-delay-0": i === 0,
                            "after:animation-delay-300": i === 1,
                            "after:animation-delay-600": i === 2,
                        }
                    )}
                    style={{
                        animationDuration: "1.8s",
                        animationDelay: `${i * 0.3}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default PulseLoader;