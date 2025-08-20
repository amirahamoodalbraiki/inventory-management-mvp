import { useState } from "react";
import { getUser } from "../services/auth";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const user = getUser();   // ⬅️ use full user object now

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="relative">
      {/* Profile Picture */}
      <button
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg font-bold text-white">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
        </div>
        <div>
          <p className="font-semibold text-gray-900">{user?.name || "User"}</p>
          <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
        </div>
      </div>
    
      <hr className="my-3" />
    
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
      )}
    </div>
  );
}