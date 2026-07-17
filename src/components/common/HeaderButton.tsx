import React from "react";
import clsx from "clsx";

interface HeaderButtonProps {
  icon: React.ReactNode;
  value?: string | number;
  badge?: number;
  color?: "primary" | "secondary" | "tertiary" | "neutral";
  onClick?: () => void;
  tooltip?: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  value,
  badge,
  color = "neutral",
  onClick,
  tooltip,
}) => {
  const colorMap: Record<string, { bg: string; text: string; hover: string; badgeBg: string }> = {
    primary: {
      bg: "bg-green-50",
      text: "text-green-700",
      hover: "hover:bg-green-100",
      badgeBg: "bg-green-600",
    },
    secondary: {
      bg: "bg-red-50",
      text: "text-red-700",
      hover: "hover:bg-red-100",
      badgeBg: "bg-red-500",
    },
    tertiary: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      hover: "hover:bg-blue-100",
      badgeBg: "bg-blue-500",
    },
    neutral: {
      bg: "bg-gray-50",
      text: "text-gray-700",
      hover: "hover:bg-gray-100",
      badgeBg: "bg-gray-600",
    },
  };

  const colors = colorMap[color];
  const hasValue = value !== undefined;
  const hasBadge = badge !== undefined && badge > 0;

  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={clsx(
        "relative inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        colors.hover,
        hasValue ? "px-3 py-2" : "p-2",
        color === "primary" && "focus:ring-green-500",
        color === "secondary" && "focus:ring-red-500",
        color === "tertiary" && "focus:ring-blue-500",
        color === "neutral" && "focus:ring-gray-300"
      )}
    >
      {/* Icon with conditional background */}
      <div
        className={clsx(
          "flex items-center justify-center transition-colors",
          hasValue ? [colors.bg, colors.text, "rounded-lg p-2"] : colors.text
        )}
      >
        {icon}
      </div>

      {/* Value display (for temperature/humidity) */}
      {hasValue && (
        <span className={clsx("text-sm font-semibold", colors.text)}>{value}</span>
      )}

      {/* Notification badge */}
      {hasBadge && (
        <span
          className={clsx(
            "absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-white text-xs font-bold rounded-full px-1.5 shadow-md",
            colors.badgeBg
          )}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
};

export default HeaderButton;
