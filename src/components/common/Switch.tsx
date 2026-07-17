// src/components/ui/Switch.tsx
import React, { useState } from "react";

interface SwitchProps {
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({
  defaultChecked = false,
  onToggle,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    setChecked(!checked);
    onToggle?.(!checked);
  };

  return (
    <button
      onClick={toggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
        checked ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default Switch;
