import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/authUser";

const Profile = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const { user } = useAuthStore();
  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "#e1dcc5" }}
    >
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Profile Section */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <img
                src="https://th.bing.com/th/id/OIP.1yoSL-WO0YU5mQKROudvswHaHa?rs=1&pid=ImgDetMain"
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome, {user.name}
              </h1>
             
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full lg:hidden shadow-md"
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

export default Profile;
