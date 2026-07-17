import React from "react";
import clsx from "clsx";

type ButtonVariant = "solid" | "smooth" | "ghost" | "raised";
type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "warning"
  | "success"
  | "attention";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  color = "primary",
  icon,
  className,
  ...props
}) => {
  const baseStyles =
    "w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all";

  const colorMap: Record<ButtonColor, string> = {
    primary: "text-white bg-primary border-primary",
    secondary: "text-white bg-secondary border-secondary",
    tertiary: "text-black bg-tertiary border-tertiary",
    warning: "text-white bg-red-500 border-red-500",
    success: "text-white bg-green-500 border-green-500",
    attention: "text-black bg-yellow-400 border-yellow-400",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    solid: `${colorMap[color]} hover:opacity-90`,
    smooth: `bg-opacity-20 text-${color} border-none hover:bg-opacity-30`,
    ghost: `border border-current text-${color} bg-transparent hover:bg-${color}/10`,
    raised: `${colorMap[color]} shadow-md hover:shadow-lg`,
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
