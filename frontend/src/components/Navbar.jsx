import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800"><img src="https://openlibrary.org/static/images/openlibrary-logo-tighter.svg" width={200} alt="" /></div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="/" className="text-gray-800 ">
          Books
        </a>
        <a href="/profile" className="text-gray-800">
          Profile
        </a>
        <a href="/login" className="text-gray-800">
          Login
        </a>
        <button
          onClick={() => alert("Logged out!")} // Replace with actual logout logic
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
