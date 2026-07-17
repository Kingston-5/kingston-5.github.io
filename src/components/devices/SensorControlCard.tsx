import React, { useState, useEffect } from "react";

interface Sensor {
  _id: string;
  name: string;
  type: string;
  device: string;
  latestReading?: {
    value: number;
    percentage: number;
    status: "low" | "medium" | "high";
    timestamp: string;
  };
}

interface SensorControlCardProps {
  sensor: Sensor;
  onViewChart: (sensorId: string) => void;
}

const SensorControlCard: React.FC<SensorControlCardProps> = ({
  sensor,
  onViewChart,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [totalReadings, setTotalReadings] = useState(0);

  // Mock data - replace with actual API call
  useEffect(() => {
    // TODO: Fetch actual sensor readings count
    setTotalReadings(Math.floor(Math.random() * 10000));
  }, [sensor._id]);

  const latestReading = sensor.latestReading || {
    value: 0,
    percentage: 0,
    status: "low" as const,
    timestamp: new Date().toISOString(),
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "high":
        return "text-green-700";
      case "medium":
        return "text-yellow-600";
      case "low":
      default:
        return "text-red-600";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
      default:
        return "bg-red-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getSensorIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "soil_moisture":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        );
      case "temperature":
        return (
          <svg
            className="w-5 h-5"
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
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-gray-500">{getSensorIcon(sensor.type)}</div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {sensor.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span
                className={`w-2 h-2 rounded-full ${getStatusDotColor(latestReading.status)}`}
              ></span>
              <span>{totalReadings.toLocaleString()} readings</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewChart(sensor._id)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              View Chart
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>

      {/* Latest Reading - Always Visible */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Latest
          </span>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`w-3 h-3 rounded-full ${getStatusDotColor(latestReading.status)}`}
            ></span>
            <div>
              <span className="text-3xl font-bold text-gray-900">
                {latestReading.percentage}%
              </span>
              <span
                className={`ml-2 text-lg font-semibold ${getStatusColor(latestReading.status)}`}
              >
                {latestReading.status.charAt(0).toUpperCase() +
                  latestReading.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Raw Value:</span>
              <span className="font-semibold text-gray-900">
                {latestReading.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Updated:</span>
              <span className="font-semibold text-gray-900">
                {formatDate(latestReading.timestamp)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Historical Readings */}
      {expanded && (
        <div className="p-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Recent Readings
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {/* Mock historical data - replace with actual API call */}
            {[
              {
                value: 450,
                percentage: 45,
                status: "medium",
                date: "2025-11-13",
              },
              { value: 320, percentage: 32, status: "low", date: "2025-11-12" },
            ].map((reading, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusDotColor(reading.status)}`}
                  ></span>
                  <span className="text-xl font-bold text-gray-900">
                    {reading.percentage}%
                  </span>
                  <span
                    className={`text-xs font-semibold ${getStatusColor(reading.status)}`}
                  >
                    {reading.status.charAt(0).toUpperCase() +
                      reading.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Raw Value:</span>
                    <span className="font-medium">{reading.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span className="font-medium">
                      {formatDate(reading.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorControlCard;
