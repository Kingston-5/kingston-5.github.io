import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`max-w-lg w-full bg-white rounded-xl shadow-lg p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
