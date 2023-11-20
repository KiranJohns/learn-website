import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaBook, FaCogs } from "react-icons/fa";
// import "./Sidebar.css"; // Import your CSS file for styling

const SampleSidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleSubMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link href="/">
          <a className={`sidebar-link ${activeMenu === "home" && "active"}`}>
            <FaHome className="sidebar-icon" />
            Home
          </a>
        </Link>
      </div>

      <div className="sidebar-item">
        <div
          className={`sidebar-link ${activeMenu === "profile" && "active"}`}
          onClick={() => handleSubMenuClick("profile")}
        >
          <FaUser className="sidebar-icon" />
          Profile
        </div>
        {activeMenu === "profile" && (
          <div className="submenu">
            <Link href="/profile/settings">
              <a className="submenu-link">Settings</a>
            </Link>
            <Link href="/profile/dashboard">
              <a className="submenu-link">Dashboard</a>
            </Link>
          </div>
        )}
      </div>

      <div className="sidebar-item">
        <div
          className={`sidebar-link ${activeMenu === "courses" && "active"}`}
          onClick={() => handleSubMenuClick("courses")}
        >
          <FaBook className="sidebar-icon" />
          Courses
        </div>
        {activeMenu === "courses" && (
          <div className="submenu">
            <Link href="/courses/all">
              <a className="submenu-link">All Courses</a>
            </Link>
            <Link href="/courses/enrolled">
              <a className="submenu-link">Enrolled Courses</a>
            </Link>
          </div>
        )}
      </div>

      <div className="sidebar-item">
        <Link href="/settings">
          <a className={`sidebar-link ${activeMenu === "settings" && "active"}`}>
            <FaCogs className="sidebar-icon" />
            Settings
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SampleSidebar;
