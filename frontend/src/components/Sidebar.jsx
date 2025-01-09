import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Sidebar = ({ isVisible }) => {
  const { logout, user } = useAuthStore();
  return (
    <aside
      className={` text-black w-64 p-4 space-y-4 ${
        isVisible ? "block" : "hidden"
      } lg:block`}
    >
      <NavLink
        to="/profile"
        className="block p-2 rounded hover:bg-blue-500 hover:text-white transition"
      >
        Dashboard
      </NavLink>
      {user.role === "admin" ? (
        <NavLink
        to="/profile/manage-book"
        className="block p-2 rounded hover:bg-blue-500 hover:text-white transition"
      >
        Manage Books
      </NavLink>
      ): (
        <></>
      )
    
    }
      
      <NavLink
        to="/profile/borrow"
        className="block p-2 rounded hover:bg-blue-500 hover:text-white transition"
      >
        Borrow Books
      </NavLink>
      
      <a
        className="block p-2 rounded cursor-pointer hover:bg-blue-500 hover:text-white transition"
        onClick={logout} 
      >
        Logout
      </a>
    </aside>
  );
};

export default Sidebar;
