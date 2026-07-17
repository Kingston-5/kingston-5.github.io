import React from "react";
import { Logo } from "@/assets";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center flex-col ${className}`}
    >
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-secondary"></div>
        <img src={Logo} className="rounded-full h-16 w-16" alt="Loader Logo" />
      </div>
      <h1 className="text-white mt-10">Loading please wait..</h1>
    </div>
  );
};

export default Loader;
