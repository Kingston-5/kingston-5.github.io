import React from "react";
import { NavLink } from "react-router-dom";
import { LuInfo } from "react-icons/lu";
import { Logo } from "@/assets";

// Define the shape of a single navigation item
interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Define the props for the Sidebar component
interface SidebarProps {
  navItems: NavItem[];
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activePath }) => {
  const isCurrentPathActive = (path: string): boolean => {
    return activePath === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-primary text-white h-screen sticky top-0 shadow-lg">
        {/* Logo Section */}
        <div className="p-6 border-b border-secondary">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full ring-2 ring-green-500"
              src={Logo}
              alt="Kwakhanya PlantIQ Logo"
            />
            <h1 className="text-lg font-bold leading-tight">
              Kingston-Enterprises
              <br />
              <span className="text-white">Starter Template</span>
            </h1>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = isCurrentPathActive(item.path);
              const Icon = item.icon;

              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-grey text-white shadow-md"
                        : "bg-secondary text-white hover:bg-secondary hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-secondary">
          <div className="flex items-start gap-2 p-3 bg-secondary rounded-lg text-sm">
            <LuInfo className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
            <div className="text-green-100">
              <p className="mb-1">Need help?</p>
              <a
                href="#"
                className="font-semibold text-white underline hover:text-green-300 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <ul className="flex justify-around items-center h-16">
          {navItems.slice(0, 5).map((item, index) => {
            const isActive = isCurrentPathActive(item.path);
            const Icon = item.icon;

            return (
              <li key={index} className="flex-1">
                <NavLink
                  to={item.path}
                  className={`flex flex-col items-center justify-center gap-1 py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-gray-500 hover:text-secondary"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "scale-110" : ""}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
