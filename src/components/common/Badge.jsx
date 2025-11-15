import React from "react";
export default function Badge({ className = "", children }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-primary text-white text-xs px-2 py-0.5 ${className}`}>{children}</span>
  );
}