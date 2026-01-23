"use client";

// Types and Interfaces
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
}

// Reusable Components
// Reusable Components with TypeScript
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300";
  const variants: Record<string, string> = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer",
    secondary:
      "border-2 border-white/20 dark:border-gray-600/40 text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-700/30 hover:border-white/40 dark:hover:border-gray-500/60 cursor-pointer",
    dark: "bg-white/5 dark:bg-gray-800/50 text-white dark:text-gray-200 border border-white/10 dark:border-gray-700/50 hover:bg-white/10 dark:hover:bg-gray-700/50",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
