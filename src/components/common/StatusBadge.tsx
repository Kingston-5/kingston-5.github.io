import React from "react";
import clsx from "clsx";
import { Bell, Thermometer, Droplet } from "lucide-react";

type StatusType = "notification" | "temperature" | "humidity" | "custom";
type StatusLevel = "normal" | "warning" | "critical";

interface StatusBadgeProps {
  type?: StatusType;
  level?: StatusLevel;
  value?: string | number;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  type = "notification",
  level = "normal",
  value,
  icon,
  size = "md",
  className,
}) => {
  const colors: Record<StatusLevel, string> = {
    normal: "bg-primary text-white",
    warning: "bg-yellow-500 text-black",
    critical: "bg-red-600 text-white",
  };

  const sizes: Record<typeof size, string> = {
    sm: "w-8 h-8 text-s",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-md",
  };

  const defaultIcons: Record<StatusType, React.ReactNode> = {
    notification: <Bell className="w-4 h-4" />,
    temperature: <Thermometer className="w-4 h-4" />,
    humidity: <Droplet className="w-4 h-4" />,
    custom: null,
  };

  return (
    <div
      className={clsx(
        "mx-5 relative flex items-center justify-center rounded-full",
        colors[level],
        sizes[size],
        className
      )}
    >
      {icon || defaultIcons[type]}

      {value !== undefined && (
        <span
          className={clsx(
            "absolute -top-1 -right-5 text-[15px] px-1.5 rounded-full bg-white text-black font-medium",
            level === "critical" && "bg-red-600 text-white",
            level === "warning" && "bg-yellow-400 text-black",
            level === "normal" && "bg-tertiary text-black"
          )}
        >
          {value}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
