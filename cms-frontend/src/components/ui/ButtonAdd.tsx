import React from "react";

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string; // To allow customization of the button label
    icon?: React.ReactNode; // To allow passing a custom icon
}

const ButtonAdd: React.FC<AddButtonProps> = ({
    label = "Add Project", // Default label
    icon = <span>+</span>, // Default icon
    className = "",
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center gap-2 px-4 py-2 bg-violet-700 text-white font-medium text-sm rounded hover:bg-violet-900/100 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:ring-offset-2 transition";

    return (
        <button className={`${baseStyles} ${className}`} {...props}>
            {icon}
            {label}
        </button>
    );
};

export default ButtonAdd;
