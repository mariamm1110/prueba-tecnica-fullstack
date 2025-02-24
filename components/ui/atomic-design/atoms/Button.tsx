

export default function Button({
    label,
    onClick,
    className,
    type = "button",
    disabled = false,
}: {
    label: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm ${className}`}
        >
            {label}
        </button>
    );
}
