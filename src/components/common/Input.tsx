import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${className}`}
        {...props}
      />
    </>
  );
};

export default Input;
