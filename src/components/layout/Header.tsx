import React from "react";
import { HeaderButton } from "@/components";
import { FaBell } from "react-icons/fa";
import { FaThermometerEmpty } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";

const Header: React.FC = () => {
  // TODO: Fetch real temperature and humidity data
  const temperature = "27°C";
  const humidity = "62%";
  const notificationCount = 3;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Environmental Data */}
        <div className="flex items-center gap-2">
          <HeaderButton
            icon={<FaThermometerEmpty className="w-5 h-5" />}
            value={temperature}
            tooltip="Current Temperature"
            color="secondary"
          />
          <HeaderButton
            icon={<FaDroplet className="w-5 h-5" />}
            value={humidity}
            tooltip="Current Humidity"
            color="tertiary"
          />
        </div>

        {/* Right side - User Actions */}
        <div className="flex items-center gap-2">
          <HeaderButton
            icon={<FaBell className="w-5 h-5" />}
            badge={notificationCount}
            tooltip="Notifications"
            color="primary"
            onClick={() => {
              // TODO: Open notifications panel
              console.log("Open notifications");
            }}
          />
          <HeaderButton
            icon={
              <img
                src="https://placehold.co/60x60/83AC3F/FFFFFF?text=Q"
                alt="User avatar"
                className="h-9 w-9 rounded-full object-cover"
              />
            }
            tooltip="Account"
            color="neutral"
            onClick={() => {
              // TODO: Open user menu
              console.log("Open user menu");
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
