import React from "react";
import { Link } from "react-router-dom";

export default function Button({ variant = "primary", className = "", to, children, ...props }) {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded transition";
  const styles = variant === "primary" ? "bg-primary text-white hover:bg-primary-dark" : "border text-gray-800 bg-white hover:bg-gray-50";
  const cls = `${base} ${styles} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <button className={cls} {...props}>{children}</button>;
}