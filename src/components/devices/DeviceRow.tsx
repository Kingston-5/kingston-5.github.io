import React, { useState, useCallback, useRef, useEffect } from "react";
import type { IDevice } from "@/types";
import PumpControlCard from "./PumpControlCard";
import SensorControlCard from "./SensorControlCard";

interface DeviceRowProps {
  device: IDevice;
  onEdit: (device: IDevice) => void;
  //onDelete: (id: string) => void;
  onPumpToggle?: (pumpId: string, action: "open" | "close") => void;
  onPumpAutoModeToggle?: (pumpId: string, enabled: boolean) => void;
  onViewSensorChart?: (sensorId: string) => void;
}

const DeviceRow: React.FC<DeviceRowProps> = React.memo(({ 
  device, 
  onEdit, 
  //onDelete,
  onPumpToggle = () => {},
  onPumpAutoModeToggle = () => {},
  onViewSensorChart = () => {}
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleToggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    onEdit(device);
    setDropdownOpen(false);
  }, [device, onEdit]);

  /**const handleDelete = useCallback(() => {
    onDelete(device._id);
    setDropdownOpen(false);
  }, [device._id, onDelete]);*/

  const handlePreview = useCallback(() => {
    alert("Preview feature coming soon");
    setDropdownOpen(false);
  }, []);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  // Status badge styling
  const getStatusStyle = (status: string) => {
    const isOnline = status.toLowerCase() === "online";
    return isOnline
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={toggleExpanded}>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                expanded ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {device.name}
          </div>
        </td>
      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(
            device.status
          )}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              device.status.toLowerCase() === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
          {device.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600" onClick={(e) => e.stopPropagation()}>
        <span className="inline-flex items-center">
          <svg
            className="w-4 h-4 mr-1.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {device.sensors.length}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600" onClick={(e) => e.stopPropagation()}>
        <span className="inline-flex items-center">
          <svg
            className="w-4 h-4 mr-1.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          {device.pumps.length}
        </span>
      </td>
      <td className="px-6 py-4 relative" 
      //ref={dropdownRef} TODO Figure this out
      onClick={(e) => e.stopPropagation()}>
        {/* Dropdown toggle */}
        <button
          onClick={handleToggleDropdown}
          className="inline-flex items-center p-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          aria-label="Actions menu"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
            <div className="py-1">
              <button
                onClick={handleEdit}
                className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>
              <button
                onClick={handlePreview}
                className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Preview
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                //onClick={handleDelete}
                className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>

    {/* Expanded Pump Controls Row */}
    {expanded && device.pumps.length > 0 && (
      <tr>
        <td colSpan={5} className="px-6 py-4 bg-gray-50">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              Pumps ({device.pumps.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {device.pumps.map((pump) => (
                <PumpControlCard
                  key={pump._id}
                  pump={pump}
                  onToggle={onPumpToggle}
                  onAutoModeToggle={onPumpAutoModeToggle}
                />
              ))}
            </div>
          </div>

          {device.sensors.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Sensors ({device.sensors.length})
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {device.sensors.map((sensor) => (
                  <SensorControlCard
                    key={sensor._id}
                    sensor={sensor}
                    onViewChart={onViewSensorChart}
                  />
                ))}
              </div>
            </div>
          )}
        </td>
      </tr>
    )}
  </>
  );
});

export default DeviceRow;
