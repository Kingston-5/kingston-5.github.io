import React, { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface PhoneInputProps {
  label?: string;
  countryCode?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (fullNumber: string) => void;
  showButton?: boolean;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = "Phone Number",
  countryCode = "+268",
  value = "",
  onChange,
  onSubmit,
  showButton = false,
  placeholder = "7xxxxxxx",
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Only allow digits
    const cleaned = input.replace(/[^\d]/g, "");
    setLocalValue(cleaned);
    onChange?.(cleaned);
  };

  const handleSubmit = () => {
    const fullNumber = `${countryCode}${localValue}`;
    onSubmit?.(fullNumber);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex items-center gap-2">
        <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 text-sm">
          {countryCode}
        </span>
        <Input
          label={label}
          type="tel"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1"
        />
        {showButton && (
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
