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
    primary: "bg-green-600 text-white hover:bg-green-700 cursor-pointer",
    secondary:
      "border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 cursor-pointer",
    dark: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
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
