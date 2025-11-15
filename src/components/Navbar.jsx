import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Badge from "./common/Badge.jsx";
import Button from "./common/Button.jsx";

export default function Navbar() {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary">Shop</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive}) => isActive ? "text-primary" : "text-gray-700"}>Home</NavLink>
          <NavLink to="/wishlist" className={({isActive}) => isActive ? "text-primary" : "text-gray-700"}>Wishlist</NavLink>
          <NavLink to="/orders" className={({isActive}) => isActive ? "text-primary" : "text-gray-700"}>Orders</NavLink>
          <NavLink to="/cart" className="relative text-gray-700">
            Cart
            <Badge className="ml-2">{totalCount}</Badge>
          </NavLink>
          {user ? (
            <Button variant="outline" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
          ) : (
            <NavLink to="/login" className={({isActive}) => isActive ? "text-primary" : "text-gray-700"}>Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}