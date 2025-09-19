import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
      <Link to="/" className={isActive("/") ? "text-blue-500 font-bold" : "text-gray-600"}>Home</Link>
      <Link to="/tracking" className={isActive("/tracking") ? "text-blue-500 font-bold" : "text-gray-600"}>Track</Link>
      <Link to="/about" className={isActive("/about") ? "text-blue-500 font-bold" : "text-gray-600"}>About</Link>
    </nav>
  );
};

export default BottomNav;
