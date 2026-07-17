import React from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, Header } from "@/components";
import { TbLayoutDashboard, TbLogout } from "react-icons/tb";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  const merchantNavItems = [
    { path: "/", label: "Dashboard", icon: TbLayoutDashboard },
    { path: "/logout", label: "Sign Out", icon: TbLogout },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar navItems={merchantNavItems} activePath={location.pathname} />

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        {/* Header */}
        <Header />

        {/* Content area: full height with padding */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="h-full">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
