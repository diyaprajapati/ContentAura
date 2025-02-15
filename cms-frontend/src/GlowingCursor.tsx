import { useEffect } from "react";

const GlowingCursor = () => {
    useEffect(() => {
        const cursor = document.createElement("div");
        cursor.classList.add("glowing-cursor");
        document.body.appendChild(cursor);

        const moveCursor = (e: { clientX: any; clientY: any; }) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        document.addEventListener("mousemove", moveCursor);

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            cursor.remove();
        };
    }, []);

    return null; // No JSX needed, just effects
};

export default GlowingCursor;
