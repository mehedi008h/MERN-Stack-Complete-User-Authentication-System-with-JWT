import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import { BsEmojiSmile, BsPhone } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="profile">
      <div className="container mt-5">
        <div className="row g-3">
          <div className="col-md-3">
            <Sidebar user={user} />
          </div>
          <div className="col-md-9">
            <div className="profile_container">
              <div className="d-flex align-items-center justify-content-between">
                <h4>My Profile</h4>
                <Link className="edit_link" to="/me/update">
                  <AiOutlineEdit className="me-2" />
                  Edit
                </Link>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between flex">
                <div className="mx-auto">
                  <div>
                    <img
                      src={user?.avatar.url}
                      style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </div>
                </div>
                <div className="divider" />
                <div className="mx-auto">
                  <Table responsive="sm md lg xl">
                    <tbody>
                      <tr>
                        <td>
                          <BsEmojiSmile size={25} />
                        </td>
                        <td className="fw-bold">Name</td>
                        <td>{user?.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <AiOutlineMail size={25} />
                        </td>
                        <td className="fw-bold">Email</td>
                        <td>{user?.email}</td>
                      </tr>
                      <tr>
                        <td>
                          <BsPhone size={25} />
                        </td>
                        <td className="fw-bold">Phone</td>
                        <td>{user?.phone}</td>
                      </tr>
                      <tr>
                        <td>
                          <GrLocation size={25} />
                        </td>
                        <td className="fw-bold">Address</td>
                        <td>{user?.address}</td>
                      </tr>
                      <tr>
                        <td>
                          <BsEmojiSmile size={25} />
                        </td>
                        <td className="fw-bold">Role</td>
                        <td>{user?.role}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
