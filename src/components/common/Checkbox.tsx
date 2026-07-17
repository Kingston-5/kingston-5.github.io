import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className={`rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${className}`}
        {...props}
      />
      <span className="ml-2 text-sm text-gray-600">{label}</span>
    </label>
  );
};

export default Checkbox;
