import React from "react";
import { Link } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineUnorderedList } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <div className="text-center">
        <img src="" alt="" />
        <h4>{user?.name}</h4>
        <p>{user?.role}</p>
      </div>
      <hr className="text-primary fw-bold" />
      <div className="links">
        <Link className="link">
          <RiUser3Line className="me-3" size={20} /> My Profile
        </Link>
        <Link className="link">
          <FaUserEdit className="me-3" size={20} /> Edit Profile
        </Link>
        <Link className="link">
          <AiOutlineUnorderedList className="me-3" size={20} /> All User
        </Link>
        <Link className="link">
          <AiOutlineLogout className="me-3" size={20} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
