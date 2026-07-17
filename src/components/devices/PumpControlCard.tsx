import React, { useState } from "react";

interface Pump {
  _id: string;
  name: string;
  status: string;
  device: string;
}

interface PumpControlCardProps {
  pump: Pump;
  onToggle: (pumpId: string, action: "open" | "close") => void;
  onAutoModeToggle: (pumpId: string, enabled: boolean) => void;
}

const PumpControlCard: React.FC<PumpControlCardProps> = ({
  pump,
  onToggle,
  onAutoModeToggle,
}) => {
  const [autoMode, setAutoMode] = useState(false);
  const isOpen = pump.status.toLowerCase() === "open" || pump.status.toLowerCase() === "on";

  const handleAutoModeToggle = () => {
    const newAutoMode = !autoMode;
    setAutoMode(newAutoMode);
    onAutoModeToggle(pump._id, newAutoMode);
  };

  const handleOpen = () => {
    onToggle(pump._id, "open");
  };

  const handleClose = () => {
    onToggle(pump._id, "close");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{pump.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">Mode: {autoMode ? "auto" : "manual"}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            isOpen
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {isOpen ? "OPENED" : "CLOSED"}
        </span>
      </div>

      {/* Auto Mode Toggle */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <label htmlFor={`auto-${pump._id}`} className="text-sm font-medium text-gray-700">
          Auto Mode
        </label>
        <button
          id={`auto-${pump._id}`}
          onClick={handleAutoModeToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            autoMode ? "bg-green-600" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={autoMode}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              autoMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleOpen}
          disabled={autoMode || isOpen}
          className={`px-4 py-2.5 rounded-lg font-medium text-white transition-all ${
            autoMode || isOpen
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
          }`}
        >
          Open
        </button>
        <button
          onClick={handleClose}
          disabled={autoMode || !isOpen}
          className={`px-4 py-2.5 rounded-lg font-medium text-white transition-all ${
            autoMode || !isOpen
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:scale-95"
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PumpControlCard;
