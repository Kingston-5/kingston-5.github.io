import React, { useState, useRef, useEffect } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(
    options.find((opt) => opt.value === value) || null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative w-full border rounded-md text-left px-3 py-2 transition 
          ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:border-gray-400"} 
          border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-56 overflow-auto"
          role="listbox"
        >
          {options.length === 0 ? (
            <li className="px-3 py-2 text-gray-500 text-sm">No options</li>
          ) : (
            options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                  selected?.value === opt.value ? "bg-gray-50 font-medium" : ""
                }`}
                role="option"
                aria-selected={selected?.value === opt.value}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
