// src/components/ui/Fab.tsx
import React from "react";
import { Plus } from "lucide-react";

interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const Fab: React.FC<FabProps> = ({ icon = <Plus />, ...props }) => (
  <button
    {...props}
    className="p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
  >
    {icon}
  </button>
);

export default Fab;
